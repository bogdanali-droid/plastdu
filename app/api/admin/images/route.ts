export const runtime = 'edge';
import { getRequestContext } from '@cloudflare/next-on-pages';

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get('file') as File | null;
  const path = formData.get('path') as string | null;

  if (!file || !path) {
    return Response.json({ error: 'Missing file or path' }, { status: 400 });
  }

  const { env } = getRequestContext();
  const r2 = (env as any).PLASTDU_IMAGES as R2Bucket;

  const buffer = await file.arrayBuffer();
  const contentType = file.type || 'application/octet-stream';

  await r2.put(path, buffer, {
    httpMetadata: { contentType },
  });

  return Response.json({ url: `/api/img/${path}` });
}

export async function DELETE(req: Request) {
  const { path } = await req.json();
  if (!path) {
    return Response.json({ error: 'Missing path' }, { status: 400 });
  }

  const { env } = getRequestContext();
  const r2 = (env as any).PLASTDU_IMAGES as R2Bucket;

  await r2.delete(path);
  return Response.json({ ok: true });
}
