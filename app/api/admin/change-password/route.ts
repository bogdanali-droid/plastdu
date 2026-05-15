export const runtime = 'edge';
import { getRequestContext } from '@cloudflare/next-on-pages';

export async function POST(req: Request) {
  try {
    const { newPassword } = await req.json();

    if (!newPassword || typeof newPassword !== 'string' || newPassword.length < 8) {
      return Response.json({ error: 'Parola trebuie să aibă cel puțin 8 caractere.' }, { status: 400 });
    }

    const { env } = getRequestContext();
    const kv = (env as any).PLASTDU_CONTENT as KVNamespace | undefined;

    if (!kv) {
      return Response.json(
        { error: 'KV storage not configured. Please bind PLASTDU_CONTENT in Cloudflare Pages → Settings → Functions → KV namespace bindings.' },
        { status: 503 }
      );
    }

    await kv.put('admin_password_override', newPassword);

    return Response.json({ ok: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Eroare internă';
    return Response.json({ error: message }, { status: 500 });
  }
}
