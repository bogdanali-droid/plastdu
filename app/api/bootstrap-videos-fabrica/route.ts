export const runtime = 'edge';
import { getRequestContext } from '@cloudflare/next-on-pages';

// One-shot bootstrap — descarcă cele 5 videoclipuri corecte din fabrică din Drive
// și înlocuiește complet lista de videoclipuri din KV `despre` (nu adaugă, ci resetează).

const VIDEO_SOURCES = [
  { fileId: '1262Zb4V02zocxHT1y9zkl8zRxlH1U02G', name: 'fabrica-01.mp4' },
  { fileId: '1awbZnCXhG3WqjVjsICTg5Gc7iR-eAN-x', name: 'fabrica-02.mp4' },
  { fileId: '10W7J9Sehzv3hAqkFsS57P-FxfgK_UK6b', name: 'fabrica-03.mp4' },
  { fileId: '1hHKem-4TJZ3T5j7gACiU9Y9XmztlZQTM', name: 'fabrica-04.mp4' },
  { fileId: '1VHVv1hr4vhTvseuyeNTPvft8xbOZibAc', name: 'fabrica-05.mp4' },
];

async function fetchDriveFile(fileId: string): Promise<{ buffer: ArrayBuffer; contentType: string } | { error: string }> {
  const url = `https://drive.usercontent.google.com/download?id=${fileId}&export=download&authuser=0`;
  try {
    const res = await fetch(url, { redirect: 'follow' });
    if (!res.ok) return { error: `HTTP ${res.status}` };
    const contentType = res.headers.get('Content-Type') || 'video/mp4';
    if (contentType.includes('text/html')) return { error: 'Drive HTML (needs confirmation — file may be too large)' };
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
  const videoUrls: string[] = [];

  // Șterge videoclipul greșit (fabrica/video/video-fabrica.mp4)
  const wrongPath = 'fabrica/video/video-fabrica.mp4';
  await r2.delete(wrongPath);

  for (const v of VIDEO_SOURCES) {
    const path = `fabrica/video/${v.name}`;
    const log: any = { name: v.name, path };

    const existing = await r2.head(path);
    if (existing) {
      log.status = 'already-exists';
      videoUrls.push(`/api/img/${path}`);
    } else {
      const result = await fetchDriveFile(v.fileId);
      if ('error' in result) {
        log.status = 'error';
        log.error = result.error;
      } else {
        await r2.put(path, result.buffer, { httpMetadata: { contentType: 'video/mp4' } });
        log.status = 'uploaded';
        log.size = result.buffer.byteLength;
        videoUrls.push(`/api/img/${path}`);
      }
    }
    results.push(log);
  }

  // Reset lista de videoclipuri în KV `despre` (înlocuiește complet)
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
  despre.fabrica.videoclipuri = videoUrls;
  await kv.put('despre', JSON.stringify(despre));

  return Response.json({
    ok: true,
    message: `Bootstrap complet. ${videoUrls.length} videoclipuri corecte încărcate. Videoclipul greșit a fost șters.`,
    videoUrls,
    results,
  });
}
