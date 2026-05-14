export const runtime = 'edge';

import { getRequestContext } from '@cloudflare/next-on-pages';

function generatePassword(length = 12) {
  const chars = 'ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$';
  let pw = '';
  const arr = new Uint8Array(length);
  crypto.getRandomValues(arr);
  for (const b of arr) pw += chars[b % chars.length];
  return pw;
}

export async function POST() {
  const { env } = getRequestContext();
  const kv = (env as any).PLASTDU_CONTENT as KVNamespace;
  const resendKey = (env as any).RESEND_API_KEY as string;

  const newPassword = generatePassword();
  await kv.put('admin_password_override', newPassword);

  if (resendKey) {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'noreply@plastdu.ro',
        to: 'bogdanaliciuc@gmail.com',
        subject: 'Plastdu Admin — Parolă nouă',
        html: `<p>Parola ta nouă de admin este: <strong>${newPassword}</strong></p><p>Schimb-o după autentificare.</p>`,
      }),
    });
  }

  return Response.json({ ok: true });
}
