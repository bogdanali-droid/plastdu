export const runtime = 'edge';
import { getRequestContext } from '@cloudflare/next-on-pages';

export async function GET(req: Request, { params }: { params: { path: string[] } }) {
  const { env } = getRequestContext();
  const r2 = (env as any).PLASTDU_IMAGES as any;

  if (!r2) {
    return new Response('Storage not configured', { status: 503 });
  }

  const path = (await params).path.join('/');
  const rangeHeader = req.headers.get('Range');

  try {
    let object: any = null;

    if (rangeHeader) {
      const match = rangeHeader.match(/bytes=(\d+)-(\d*)/);
      if (match) {
        const offset = parseInt(match[1], 10);
        const endByte = match[2] ? parseInt(match[2], 10) : undefined;
        const length = endByte !== undefined ? endByte - offset + 1 : undefined;
        object = await r2.get(path, { range: length !== undefined ? { offset, length } : { offset } });
      }
    }

    if (!object) {
      object = await r2.get(path);
    }

    if (!object) {
      return new Response('Not found', { status: 404 });
    }

    const headers = new Headers();
    object.writeHttpMetadata(headers);
    headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    headers.set('Accept-Ranges', 'bytes');

    if (rangeHeader && object.range) {
      const r = object.range as { offset: number; length: number };
      const start = r.offset;
      const end = r.offset + r.length - 1;
      headers.set('Content-Range', `bytes ${start}-${end}/${object.size}`);
      headers.set('Content-Length', String(r.length));
      return new Response(object.body, { status: 206, headers });
    }

    return new Response(object.body, { headers });
  } catch {
    return new Response('Internal error', { status: 500 });
  }
}
