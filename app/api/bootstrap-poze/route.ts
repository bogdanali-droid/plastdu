export const runtime = 'edge';
import { getRequestContext } from '@cloudflare/next-on-pages';

// One-shot bootstrap — descarcă cele 11 poze + 1 videoclip WhatsApp din Drive-ul public
// și populează R2 + KV automat. Idempotent (nu duplică dacă fișierul există deja).

const POZE_SOURCES = [
  { fileId: '1svnuNMhMPqo4JKhwi8EbEv1WZYFH4n3n', name: 'poza-01.jpeg' },
  { fileId: '1qBau9xTZprfvdOuUqfWWYyfejgmg3NIh', name: 'poza-02.jpeg' },
  { fileId: '16TBc2WaO-gUU_XDJ-Rtkf52QHQwUZXsO', name: 'poza-03.jpeg' },
  { fileId: '1D5E_1boXu9tj7Yfi42OohTuhUWJGQY8s', name: 'poza-04.jpeg' },
  { fileId: '1piOfbVTyLZ_YMnH1KUMJpmQLXCdl34BI', name: 'poza-05.jpeg' },
  { fileId: '19T72UoEMHlAcGBj2FH9eLJAct4tJ7oaK', name: 'poza-06.jpeg' },
  { fileId: '1bfvNDHmXSWY62kg5OpgoA5VxwgZE8PLb', name: 'poza-07.jpeg' },
  { fileId: '1jt_bh71UY7vxDjWwccdh7q4UYI890uXo', name: 'poza-08.jpeg' },
  { fileId: '1YdZ2xsnxjxC9ObJJYBOE5OpwuAZWoqBt', name: 'poza-09.jpeg' },
  { fileId: '1g9in0hf_fTV7pNP8uA5nSd3hOZS69fOE', name: 'poza-10.jpeg' },
  { fileId: '11JFE_zsOvVcHE2b1n9M_CkaPjKBw6C7O', name: 'poza-11.jpeg' },
];

const VIDEO_SOURCE = { fileId: '15C8uBJ96lRm7lchAMLjhPwOeKe4pbB-m', name: 'video-fabrica.mp4' };

function readExifGps(buffer: ArrayBuffer): { lat: number; lng: number } | null {
  try {
    const view = new DataView(buffer);
    if (view.getUint16(0) !== 0xFFD8) return null;
    let offset = 2;
    while (offset < view.byteLength - 4) {
      const marker = view.getUint16(offset);
      offset += 2;
      if (marker === 0xFFE1) {
        const segLen = view.getUint16(offset);
        const hdr = new Uint8Array(buffer, offset + 2, 4);
        const exifHeader = String.fromCharCode(hdr[0], hdr[1], hdr[2], hdr[3]);
        if (exifHeader !== 'Exif') { offset += segLen; continue; }
        const tiffStart = offset + 8;
        const byteOrder = view.getUint16(tiffStart);
        const le = byteOrder === 0x4949;
        const read16 = (o: number) => le ? view.getUint16(tiffStart + o, true) : view.getUint16(tiffStart + o);
        const read32 = (o: number) => le ? view.getUint32(tiffStart + o, true) : view.getUint32(tiffStart + o);
        const ifdOffset = read32(4);
        const numEntries = read16(ifdOffset);
        let gpsOffset: number | null = null;
        for (let i = 0; i < numEntries; i++) {
          const entryOffset = ifdOffset + 2 + i * 12;
          if (read16(entryOffset) === 0x8825) gpsOffset = read32(entryOffset + 8);
        }
        if (gpsOffset === null) return null;
        const gpsEntries = read16(gpsOffset);
        const gpsData: Record<number, any> = {};
        for (let i = 0; i < gpsEntries; i++) {
          const e = gpsOffset + 2 + i * 12;
          const tag = read16(e);
          const count = read32(e + 4);
          const valOffset = read32(e + 8);
          if (tag === 1 || tag === 3) {
            gpsData[tag] = String.fromCharCode(new Uint8Array(buffer, tiffStart + valOffset)[0]);
          } else if (tag === 2 || tag === 4) {
            const rationals: number[] = [];
            for (let j = 0; j < count; j++) {
              const rOff = tiffStart + valOffset + j * 8;
              const num = le ? view.getUint32(rOff, true) : view.getUint32(rOff);
              const den = le ? view.getUint32(rOff + 4, true) : view.getUint32(rOff + 4);
              rationals.push(den !== 0 ? num / den : 0);
            }
            gpsData[tag] = rationals;
          }
        }
        if (!gpsData[2] || !gpsData[4]) return null;
        const toDeg = (r: number[]) => r[0] + r[1] / 60 + r[2] / 3600;
        let lat = toDeg(gpsData[2]);
        let lng = toDeg(gpsData[4]);
        if (gpsData[1] === 'S') lat = -lat;
        if (gpsData[3] === 'W') lng = -lng;
        return { lat, lng };
      } else {
        if (offset + 2 > view.byteLength) break;
        offset += view.getUint16(offset);
      }
    }
    return null;
  } catch { return null; }
}

async function fetchDriveFile(fileId: string): Promise<{ buffer: ArrayBuffer; contentType: string } | { error: string }> {
  const url = `https://drive.usercontent.google.com/download?id=${fileId}&export=download&authuser=0`;
  try {
    const res = await fetch(url, { redirect: 'follow' });
    if (!res.ok) return { error: `HTTP ${res.status}` };
    const contentType = res.headers.get('Content-Type') || 'application/octet-stream';
    if (contentType.includes('text/html')) return { error: 'Drive returned HTML (file needs confirmation)' };
    const buffer = await res.arrayBuffer();
    return { buffer, contentType };
  } catch (e) {
    return { error: e instanceof Error ? e.message : 'Fetch failed' };
  }
}

export async function GET() {
  const { env } = getRequestContext();
  const r2 = (env as any).PLASTDU_IMAGES as R2Bucket | undefined;
  const kv = (env as any).PLASTDU_CONTENT as KVNamespace | undefined;

  if (!r2 || !kv) return Response.json({ error: 'R2 or KV not bound' }, { status: 503 });

  const results: any[] = [];
  const pozeEntries: { url: string; lat?: number; lng?: number; data?: string }[] = [];

  // Descarcă pozele
  for (const p of POZE_SOURCES) {
    const path = `poze-proiecte/${p.name}`;
    const log: any = { name: p.name, path };

    const existing = await r2.head(path);
    let buffer: ArrayBuffer | null = null;

    if (existing) {
      log.status = 'already-exists';
      const obj = await r2.get(path);
      if (obj) buffer = await obj.arrayBuffer();
    } else {
      const result = await fetchDriveFile(p.fileId);
      if ('error' in result) {
        log.status = 'error';
        log.error = result.error;
        results.push(log);
        continue;
      }
      await r2.put(path, result.buffer, { httpMetadata: { contentType: result.contentType } });
      log.status = 'uploaded';
      log.size = result.buffer.byteLength;
      buffer = result.buffer;
    }

    // Extract EXIF GPS
    const gps = buffer ? readExifGps(buffer) : null;
    const entry: any = { url: `/api/img/${path}`, data: new Date().toISOString() };
    if (gps) {
      entry.lat = gps.lat;
      entry.lng = gps.lng;
      log.gps = { lat: gps.lat, lng: gps.lng };
    } else {
      log.gps = null;
    }
    pozeEntries.push(entry);
    results.push(log);
  }

  // Descarcă videoul
  const videoPath = `fabrica/video/${VIDEO_SOURCE.name}`;
  const videoLog: any = { name: VIDEO_SOURCE.name, path: videoPath };
  const existingVideo = await r2.head(videoPath);
  if (existingVideo) {
    videoLog.status = 'already-exists';
  } else {
    const videoResult = await fetchDriveFile(VIDEO_SOURCE.fileId);
    if ('error' in videoResult) {
      videoLog.status = 'error';
      videoLog.error = videoResult.error;
    } else {
      await r2.put(videoPath, videoResult.buffer, { httpMetadata: { contentType: videoResult.contentType } });
      videoLog.status = 'uploaded';
      videoLog.size = videoResult.buffer.byteLength;
    }
  }
  results.push(videoLog);

  // Populate KV `poze-proiecte`
  await kv.put('poze-proiecte', JSON.stringify(pozeEntries));

  // Populate KV `despre` cu videoclipul în fabrica.videoclipuri (dacă nu e deja acolo)
  const despreRaw = await kv.get('despre');
  const DEFAULT_DESPRE = {
    cifre: [
      { val: '2017', label: 'An înființare' },
      { val: '8+', label: 'Județe deservite' },
      { val: '5', label: 'Linii de producție' },
      { val: 'B2B', label: 'Focus exclusiv' },
    ],
    specializari: [
      'Producția de dibluri pentru polistiren (termoizolație exterioară EPS)',
      'Producția de dibluri pentru vată minerală',
      'Producția de distanțieri pentru beton',
      'Distribuția de materiale de construcții și organe de asamblare',
    ],
    fabrica: {
      imagini: ['/images/fabrica/01.jpg', '/images/fabrica/04.jpg', '/images/fabrica/05.jpg'],
      videoclipuri: [] as string[],
      adresa: 'Str. Ana Ipătescu nr. 44, Spațiul I4, Com. Jilava, Ilfov',
    },
  };
  const despre = despreRaw ? JSON.parse(despreRaw) : DEFAULT_DESPRE;
  if (!despre.fabrica.videoclipuri) despre.fabrica.videoclipuri = [];
  const videoUrl = `/api/img/${videoPath}`;
  if (!despre.fabrica.videoclipuri.includes(videoUrl)) {
    despre.fabrica.videoclipuri.push(videoUrl);
    await kv.put('despre', JSON.stringify(despre));
  }

  const gpsCount = pozeEntries.filter((p) => p.lat != null).length;

  return Response.json({
    ok: true,
    message: `Bootstrap complet. ${pozeEntries.length} poze încărcate (${gpsCount} cu GPS), 1 video adăugat în secțiunea "Cum producem".`,
    results,
    summary: {
      poze_total: pozeEntries.length,
      poze_cu_gps: gpsCount,
      video_url: videoUrl,
    },
  });
}
