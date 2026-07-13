import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.ADMIN_JWT_SECRET);

async function isValidAdminToken(token) {
  if (!token) return false;
  try {
    await jwtVerify(token, JWT_SECRET);
    return true;
  } catch {
    return false;
  }
}

export async function middleware(req) {
  console.log('Middleware:', req.nextUrl.pathname);

  if (process.env.NODE_ENV === 'development') {
    const host = req.headers.get('host');
    const isBareLocalhost = host?.startsWith('localhost');

    if (isBareLocalhost) {
      const devHost = process.env.NEXT_PUBLIC_DEV_HOST?.trim() || 'vedam.localhost';
      const redirectUrl = new URL(req.url);
      redirectUrl.hostname = devHost;
      return NextResponse.redirect(redirectUrl);
    }
  }

  const { pathname } = req.nextUrl;

  if (pathname === '/admin/login') {
    return NextResponse.next();
  }

  if (pathname === '/admin' || pathname.startsWith('/admin/')) {
    const token = req.cookies.get('admin_token')?.value;
    const isAuthenticated = await isValidAdminToken(token);

    if (!isAuthenticated) {
      const loginUrl = new URL('/admin/login', req.url);
      loginUrl.searchParams.set('next', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
};