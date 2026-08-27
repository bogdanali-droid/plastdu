export const runtime = 'edge';
import { getRequestContext } from '@cloudflare/next-on-pages';

const CERTIFICATE_SOURCES = [
  {
    key: '9001',
    titlu: 'ISO 9001 — Management Calitate',
    descriere: 'Certificare privind Sistemul de Management al Calității — procese standardizate și îmbunătățire continuă pe întregul flux de producție și livrare.',
    pdfId: '1GXmtSZODTRqlgmr4IigasNmwIJMdezqI',
    imageId: '1mEA7HH878yoQHzOWO7fFT-dGPa4h4iLS',
  },
  {
    key: '14001',
    titlu: 'ISO 14001 — Management de Mediu',
    descriere: 'Certificare a Sistemului de Management de Mediu — utilizarea eficientă a resurselor, reciclarea materialelor plastice și reducerea amprentei ecologice în producție.',
    pdfId: '1zfVI-yeiVpGJ0zkEuPiQU6NNEbqdQIu3',
    imageId: '1Aqqqo89X2LLvRL5uiGB-O0TOpFR5WexP',
  },
  {
    key: '45001',
    titlu: 'ISO 45001 — Sănătate și Securitate în Muncă',
    descriere: 'Certificare a Sistemului de Management al Sănătății și Securității Ocupaționale — protecția angajaților, evaluarea riscurilor și prevenirea accidentelor în fabrică.',
    pdfId: '1pl22JFAtEc4kpChU0a7lxbhYSBBAKQ9G',
    imageId: '1XsTgunSIkmFaQOr5dWYQ34BvfcYtaPZB',
  },
  {
    key: 'sme',
    titlu: 'Coface SME Certificate',
    descriere: 'Certificat de bonitate emis de Coface — recunoaștere a solidității financiare și a fiabilității comerciale a Plast Du IV SRL ca partener B2B de încredere.',
    pdfId: '1egRfx8jcqHX12m7lzk3lXc0IRwmitBPB',
    imageId: null as string | null,
  },
];

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
  const kvEntries: any[] = [];

  for (const cert of CERTIFICATE_SOURCES) {
    const entry: any = {
      titlu: cert.titlu,
      descriere: cert.descriere,
      fisier: '',
      imagineIcon: '',
      tip: 'pdf' as const,
    };
    const log: any = { key: cert.key, pdf: null, image: null };

    if (cert.pdfId) {
      const pdfPath = `certificate/${cert.key}.pdf`;
      const existingPdf = await r2.head(pdfPath);
      if (existingPdf) {
        log.pdf = { status: 'already-exists', path: pdfPath };
        entry.fisier = `/api/img/${pdfPath}`;
      } else {
        const pdfResult = await fetchDriveFile(cert.pdfId);
        if ('error' in pdfResult) log.pdf = { status: 'error', error: pdfResult.error };
        else {
          await r2.put(pdfPath, pdfResult.buffer, { httpMetadata: { contentType: 'application/pdf' } });
          log.pdf = { status: 'uploaded', size: pdfResult.buffer.byteLength, path: pdfPath };
          entry.fisier = `/api/img/${pdfPath}`;
        }
      }
    }

    if (cert.imageId) {
      const imgPath = `certificate/${cert.key}.png`;
      const existingImg = await r2.head(imgPath);
      if (existingImg) {
        log.image = { status: 'already-exists', path: imgPath };
        entry.imagineIcon = `/api/img/${imgPath}`;
      } else {
        const imgResult = await fetchDriveFile(cert.imageId);
        if ('error' in imgResult) log.image = { status: 'error', error: imgResult.error };
        else {
          await r2.put(imgPath, imgResult.buffer, { httpMetadata: { contentType: 'image/png' } });
          log.image = { status: 'uploaded', size: imgResult.buffer.byteLength, path: imgPath };
          entry.imagineIcon = `/api/img/${imgPath}`;
        }
      }
    }

    results.push(log);
    kvEntries.push(entry);
  }

  await kv.put('certificate', JSON.stringify(kvEntries));

  return Response.json({
    ok: true,
    message: 'Bootstrap complet. Certificatele au fost descărcate din Drive și încărcate în R2. KV populat cu imagineIcon (PNG) + fisier (PDF).',
    results,
    kvEntries,
  });
}
