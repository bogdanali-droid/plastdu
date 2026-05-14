export const runtime = 'edge';
import { SignJWT } from 'jose';
import { getRequestContext } from '@cloudflare/next-on-pages';

export async function POST(req: Request) {
  const { password } = await req.json();
  const { env } = getRequestContext();
  const adminPassword = (env as any).ADMIN_PASSWORD as string;
  const jwtSecret = (env as any).JWT_SECRET as string;

  if (!adminPassword || password !== adminPassword) {
    return Response.json({ error: 'Parolă incorectă' }, { status: 401 });
  }

  const secret = new TextEncoder().encode(jwtSecret || 'dev-secret-change-me');
  const token = await new SignJWT({ role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('8h')
    .sign(secret);

  return new Response(JSON.stringify({ ok: true }), {
    headers: {
      'Content-Type': 'application/json',
      'Set-Cookie': `admin_session=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=28800`,
    },
  });
}
