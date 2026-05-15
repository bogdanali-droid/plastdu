export const runtime = 'edge';

import { getRequestContext } from '@cloudflare/next-on-pages';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const path = formData.get('path') as string | null;

    if (!file || !path) {
      return Response.json({ error: 'Missing file or path' }, { status: 400 });
    }

    const { env } = getRequestContext();
    const r2 = (env as any).PLASTDU_IMAGES as R2Bucket | undefined;

    if (!r2) {
      return Response.json(
        { error: 'R2 storage not configured. Bind PLASTDU_IMAGES in Cloudflare Pages → Settings → Functions → R2 bucket bindings.' },
        { status: 503 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    await r2.put(path, arrayBuffer, {
      httpMetadata: { contentType: file.type || 'application/octet-stream' },
    });

    return Response.json({ url: `/api/img/${path}` });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'Eroare internă';
    return Response.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { path } = await req.json();
    if (!path) {
      return Response.json({ error: 'Missing path' }, { status: 400 });
    }

    const { env } = getRequestContext();
    const r2 = (env as any).PLASTDU_IMAGES as R2Bucket | undefined;

    if (!r2) {
      return Response.json(
        { error: 'R2 storage not configured.' },
        { status: 503 }
      );
    }

    await r2.delete(path);
    return Response.json({ ok: true });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'Eroare internă';
    return Response.json({ error: message }, { status: 500 });
  }
}
