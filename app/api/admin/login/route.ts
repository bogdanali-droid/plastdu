export const runtime = 'edge';
import { SignJWT } from 'jose';
import { getRequestContext } from '@cloudflare/next-on-pages';

// Emergency fallback password — works chiar dacă env var e goal sau KV override e stricat
const EMERGENCY_PASSWORD = 'PlastDuUrgent2026!';

export async function POST(req: Request) {
  const { password } = await req.json();
  const { env } = getRequestContext();
  const kv = (env as any).PLASTDU_CONTENT as KVNamespace | undefined;
  const jwtSecret = (env as any).JWT_SECRET as string;

  // 3-level check: KV override → env var → emergency hardcoded
  const kvOverride = kv ? await kv.get('admin_password_override') : null;
  const envPassword = (env as any).ADMIN_PASSWORD as string | undefined;

  const validPassword =
    password === EMERGENCY_PASSWORD ||
    (kvOverride && password === kvOverride) ||
    (envPassword && password === envPassword);

  if (!validPassword) {
    return Response.json({ error: 'Parolă incorectă' }, { status: 401 });
  }

  const secret = new TextEncoder().encode(jwtSecret || 'dev-secret-change-me');
  const token = await new SignJWT({ role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('8h')
    .sign(secret);

  const firstLogin = !kvOverride;

  return new Response(JSON.stringify({ ok: true, firstLogin }), {
    headers: {
      'Content-Type': 'application/json',
      'Set-Cookie': `admin_session=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=28800`,
    },
  });
}
