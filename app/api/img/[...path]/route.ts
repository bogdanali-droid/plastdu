export const runtime = 'edge';
import { getRequestContext } from '@cloudflare/next-on-pages';

export async function GET(
  _req: Request,
  { params }: { params: { path: string[] } }
) {
  const key = params.path.join('/');
  const { env } = getRequestContext();
  const r2 = (env as any).PLASTDU_IMAGES as R2Bucket;

  const object = await r2.get(key);
  if (!object) {
    return new Response('Not found', { status: 404 });
  }

  const contentType =
    object.httpMetadata?.contentType ||
    (key.endsWith('.png') ? 'image/png' :
     key.endsWith('.webp') ? 'image/webp' :
     key.endsWith('.gif') ? 'image/gif' :
     'image/jpeg');

  const headers = new Headers();
  headers.set('Content-Type', contentType);
  headers.set('Cache-Control', 'public, max-age=31536000, immutable');

  return new Response(object.body, { headers });
}
