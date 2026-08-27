export const runtime = 'edge';
import { getRequestContext } from '@cloudflare/next-on-pages';

// SVG Coface Certificate badge (custom design — brand colors)
const COFACE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="300" height="300">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#003DA5"/>
      <stop offset="1" stop-color="#001E52"/>
    </linearGradient>
  </defs>
  <rect width="300" height="300" fill="#ffffff"/>
  <circle cx="150" cy="150" r="120" fill="url(#bg)"/>
  <circle cx="150" cy="150" r="110" fill="none" stroke="#ffffff" stroke-width="2" opacity="0.35"/>
  <circle cx="150" cy="150" r="100" fill="none" stroke="#ffffff" stroke-width="1" opacity="0.5"/>
  <text x="150" y="120" font-family="Arial, sans-serif" font-weight="700" font-size="26" fill="#ffffff" text-anchor="middle" letter-spacing="3">COFACE</text>
  <line x1="70" y1="135" x2="230" y2="135" stroke="#ff9c00" stroke-width="3"/>
  <text x="150" y="175" font-family="Arial, sans-serif" font-weight="900" font-size="52" fill="#ffffff" text-anchor="middle" letter-spacing="6">SME</text>
  <text x="150" y="210" font-family="Arial, sans-serif" font-weight="600" font-size="14" fill="#ff9c00" text-anchor="middle" letter-spacing="2">CERTIFICATE</text>
  <text x="150" y="238" font-family="Arial, sans-serif" font-weight="500" font-size="11" fill="#ffffff" text-anchor="middle" letter-spacing="1.5" opacity="0.85">RATING PARTNER B2B</text>
</svg>`;

const CERTIFICATE_SOURCES = [
  {
    key: '9001',
    titlu: 'ISO 9001 — Management Calitate',
    descriere: 'Certificare privind Sistemul de Management al Calității — procese standardizate și îmbunătățire continuă pe întregul flux de producție și livrare.',
    pdfId: '1GXmtSZODTRqlgmr4IigasNmwIJMdezqI',
    imageId: '1mEA7HH878yoQHzOWO7fFT-dGPa4h4iLS',
    embeddedSvg: null as string | null,
  },
  {
    key: '14001',
    titlu: 'ISO 14001 — Management de Mediu',
    descriere: 'Certificare a Sistemului de Management de Mediu — utilizarea eficientă a resurselor, reciclarea materialelor plastice și reducerea amprentei ecologice în producție.',
    pdfId: '1zfVI-yeiVpGJ0zkEuPiQU6NNEbqdQIu3',
    imageId: '1Aqqqo89X2LLvRL5uiGB-O0TOpFR5WexP',
    embeddedSvg: null as string | null,
  },
  {
    key: '45001',
    titlu: 'ISO 45001 — Sănătate și Securitate în Muncă',
    descriere: 'Certificare a Sistemului de Management al Sănătății și Securității Ocupaționale — protecția angajaților, evaluarea riscurilor și prevenirea accidentelor în fabrică.',
    pdfId: '1pl22JFAtEc4kpChU0a7lxbhYSBBAKQ9G',
    imageId: '1XsTgunSIkmFaQOr5dWYQ34BvfcYtaPZB',
    embeddedSvg: null as string | null,
  },
  {
    key: 'sme',
    titlu: 'Coface SME Certificate',
    descriere: 'Certificat de bonitate emis de Coface — recunoaștere a solidității financiare și a fiabilității comerciale a Plast Du IV SRL ca partener B2B de încredere.',
    pdfId: '1egRfx8jcqHX12m7lzk3lXc0IRwmitBPB',
    imageId: null as string | null,
    embeddedSvg: COFACE_SVG,
  },
];

async function fetchDriveFile(fileId: string): Promise<{ buffer: ArrayBuffer; contentType: string } | { error: string }> {
  const url = `https://drive.usercontent.google.com/download?id=${fileId}&export=download&authuser=0`;
  try {
    const res = await fetch(url, { redirect: 'follow' });
    if (!res.ok) return { error: `HTTP ${res.status}` };
    const contentType = res.headers.get('Content-Type') || 'application/octet-stream';
    if (contentType.includes('text/html')) return { error: 'Drive returned HTML' };
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
    const entry: any = { titlu: cert.titlu, descriere: cert.descriere, fisier: '', imagineIcon: '', tip: 'pdf' as const };
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

    if (cert.embeddedSvg) {
      const svgPath = `certificate/${cert.key}.svg`;
      const existingSvg = await r2.head(svgPath);
      if (!existingSvg) {
        const encoded = new TextEncoder().encode(cert.embeddedSvg);
        await r2.put(svgPath, encoded.buffer, { httpMetadata: { contentType: 'image/svg+xml' } });
        log.image = { status: 'uploaded-svg', size: encoded.length, path: svgPath };
      } else {
        log.image = { status: 'already-exists-svg', path: svgPath };
      }
      entry.imagineIcon = `/api/img/${svgPath}`;
    } else if (cert.imageId) {
      const imgPath = `certificate/${cert.key}.png`;
      const existingImg = await r2.head(imgPath);
      if (existingImg) {
        log.image = { status: 'already-exists', path: imgPath };
        entry.imagineIcon = `/api/img/${imgPath}`;
      } else {
        const imgResult = await fetchDriveFile(cert.imageId);
        if ('error' in imgResult) log.image = { status: 'error-drive', error: imgResult.error };
        else {
          await r2.put(imgPath, imgResult.buffer, { httpMetadata: { contentType: 'image/png' } });
          log.image = { status: 'uploaded-drive', size: imgResult.buffer.byteLength, path: imgPath };
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
    message: 'Bootstrap complet. Include Coface SVG embedded (design custom).',
    results,
    kvEntries,
  });
}
