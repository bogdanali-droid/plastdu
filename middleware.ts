import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export const config = { matcher: ['/admin/:path*', '/api/admin/:path*'] };

export async function middleware(req: NextRequest) {
  // allow login page and login API
  if (
    req.nextUrl.pathname === '/admin/login' ||
    req.nextUrl.pathname === '/api/admin/login'
  ) {
    return NextResponse.next();
  }
  const token = req.cookies.get('admin_session')?.value;
  if (!token) return NextResponse.redirect(new URL('/admin/login', req.url));
  try {
    const secret = new TextEncoder().encode(
      process.env.JWT_SECRET || 'dev-secret-change-me'
    );
    await jwtVerify(token, secret);
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL('/admin/login', req.url));
  }
}
