import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decodeJwt } from '@/lib/jwt';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get('access_token')?.value;
  const refreshToken = request.cookies.get('refresh_token')?.value;

  const isAdminPath = pathname.startsWith('/admin');
  const isAuthRoute = pathname.startsWith('/auth');

  let payload = accessToken ? decodeJwt(accessToken) : null;

  const isExpired = payload && payload.exp && payload.exp * 1000 < Date.now();

  if (isExpired || (!payload && refreshToken)) {
    try {
      const refreshResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
        {
          method: 'POST',
          headers: { Cookie: request.headers.get('cookie') ?? '' },
        },
      );

      if (refreshResponse.ok) {
        const newAccessToken = refreshResponse.headers
          .getSetCookie()
          .find((c) => c.startsWith('access_token='))
          ?.split(';')[0]
          ?.split('=')[1];

        payload = newAccessToken ? decodeJwt(newAccessToken) : null;

        let response: NextResponse;

        if (isAdminPath && (!payload || payload.role !== 'admin')) {
          response = NextResponse.redirect(new URL('/auth/login', request.url));
        } else if (isAuthRoute && payload) {
          response = NextResponse.redirect(
            new URL(payload.role === 'admin' ? '/admin' : '/map', request.url),
          );
        } else {
          response = NextResponse.next();
        }

        refreshResponse.headers.getSetCookie().forEach((cookie) => {
          response.headers.append('Set-Cookie', cookie);
        });

        return response;
      } else {
        payload = null;
      }
    } catch {
      payload = null;
    }
  }

  if (isAdminPath) {
    if (!payload || payload.role !== 'admin') {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }

  if (isAuthRoute && payload) {
    return NextResponse.redirect(
      new URL(payload.role === 'admin' ? '/admin' : '/map', request.url),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/auth/:path*'],
};
