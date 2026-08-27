export const runtime = 'edge';
import { getRequestContext } from '@cloudflare/next-on-pages';

function extractDriveFileId(url: string): string | null {
  const patterns = [
    /\/file\/d\/([a-zA-Z0-9_-]+)/,
    /[?&]id=([a-zA-Z0-9_-]+)/,
    /\/d\/([a-zA-Z0-9_-]+)/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

async function downloadFromDrive(fileId: string): Promise<{ buffer: ArrayBuffer; contentType: string } | { error: string }> {
  const directUrl = `https://drive.usercontent.google.com/download?id=${fileId}&export=download&authuser=0`;
  try {
    const res = await fetch(directUrl, { redirect: 'follow' });
    if (!res.ok) return { error: `Drive fetch eșuat (${res.status})` };
    const contentType = res.headers.get('Content-Type') || 'application/octet-stream';
    if (contentType.includes('text/html')) {
      return { error: 'Fișierul necesită confirmare Drive (poate fi prea mare sau restricționat). Deschide-l manual din Drive.' };
    }
    const buffer = await res.arrayBuffer();
    return { buffer, contentType };
  } catch (e) {
    return { error: e instanceof Error ? e.message : 'Fetch eșuat' };
  }
}

export async function POST(req: Request) {
  try {
    const { url, path, driveUrl } = await req.json();
    const sourceUrl = driveUrl || url;
    if (!sourceUrl || !path) {
      return Response.json({ error: 'Missing driveUrl or path' }, { status: 400 });
    }

    const fileId = extractDriveFileId(sourceUrl);
    if (!fileId) {
      return Response.json({ error: 'Nu am putut extrage File ID din URL Drive. Folosește link direct la fișier, nu la folder.' }, { status: 400 });
    }

    const { env } = getRequestContext();
    const r2 = (env as any).PLASTDU_IMAGES as R2Bucket | undefined;
    if (!r2) {
      return Response.json({ error: 'R2 not configured' }, { status: 503 });
    }

    const result = await downloadFromDrive(fileId);
    if ('error' in result) {
      return Response.json({ error: result.error }, { status: 502 });
    }

    await r2.put(path, result.buffer, { httpMetadata: { contentType: result.contentType } });
    return Response.json({ url: `/api/img/${path}`, size: result.buffer.byteLength, contentType: result.contentType });
  } catch (e) {
    return Response.json({ error: e instanceof Error ? e.message : 'Eroare internă' }, { status: 500 });
  }
}
