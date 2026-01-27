import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decodeJwt } from '@/lib/jwt';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get('access_token')?.value;

  const isAdminPath = pathname.startsWith('/admin');
  const isAuthRoute = pathname.startsWith('/auth');

  let payload;
  if (accessToken) {
    payload = decodeJwt(accessToken);
  }

  if (isAdminPath) {
    if (!payload || payload.role !== 'admin') {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }

  if (isAuthRoute && payload) {
    if (payload.role === 'admin') {
      return NextResponse.redirect(new URL('/admin', request.url));
    }

    return NextResponse.redirect(new URL('/map', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/auth/:path*'],
};
