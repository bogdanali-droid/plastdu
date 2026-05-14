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
    object.httpMetadata?.contentType || guessContentType(key);

  return new Response(object.body, {
    headers: {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}

function guessContentType(key: string): string {
  const ext = key.split('.').pop()?.toLowerCase();
  switch (ext) {
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg';
    case 'png':
      return 'image/png';
    case 'webp':
      return 'image/webp';
    case 'gif':
      return 'image/gif';
    case 'svg':
      return 'image/svg+xml';
    default:
      return 'application/octet-stream';
  }
}
