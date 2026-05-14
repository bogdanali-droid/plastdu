export const runtime = 'edge';

import { getRequestContext } from '@cloudflare/next-on-pages';

export async function POST(req: Request) {
  const { newPassword } = await req.json();

  if (!newPassword || typeof newPassword !== 'string' || newPassword.length < 8) {
    return Response.json(
      { error: 'Parola trebuie să aibă cel puțin 8 caractere.' },
      { status: 400 }
    );
  }

  const { env } = getRequestContext();
  const kv = (env as any).PLASTDU_CONTENT as KVNamespace;
  await kv.put('admin_password_override', newPassword);

  return Response.json({ ok: true });
}
