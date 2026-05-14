export const runtime = 'edge';
import { getRequestContext } from '@cloudflare/next-on-pages';

function generatePassword(length = 12): string {
  const chars = 'ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#';
  const arr = new Uint8Array(length);
  crypto.getRandomValues(arr);
  return Array.from(arr).map(b => chars[b % chars.length]).join('');
}

export async function POST() {
  const { env } = getRequestContext();
  const kv = (env as any).PLASTDU_CONTENT as KVNamespace;
  const resendKey = (env as any).RESEND_API_KEY as string | undefined;

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
        from: 'admin@plastdu.ro',
        to: 'bogdanaliciuc@gmail.com',
        subject: 'Plast Du IV — Parolă nouă admin',
        html: `<p>Parola ta nouă pentru panoul de administrare plastdu.ro este:</p><h2 style="font-family:monospace;letter-spacing:2px">${newPassword}</h2><p>Accesează <a href="https://plastdu.ro/admin/login">https://plastdu.ro/admin/login</a></p>`,
      }),
    });
  }

  return Response.json({ ok: true });
}
