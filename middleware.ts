import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const isHttps = request.headers.get('x-forwarded-proto') === 'https';
  // const origin = request.headers.get('origin'); // Get origin dynamically
  const allowedOrigin =
    process.env.NODE_ENV === 'production'
      ? 'https://ezyrent-web.vercel.app'
      : 'http://localhost:3000';

  // Get auth token from cookies
  const authToken = request.cookies.get('ezyrent_auth_token')?.value;
  const freshLogin = request.cookies.get('fresh_login')?.value === 'true';

  if (!isHttps && process.env.NODE_ENV === 'production') {
    return NextResponse.redirect(`https://${url.host}${url.pathname}`);
  }

  // Handle CORS for API requests
  if (request.method === 'OPTIONS') {
    const response = new NextResponse(null, { status: 204 });
    response.headers.append('Access-Control-Allow-Origin', allowedOrigin);
    response.headers.append(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE, OPTIONS'
    );
    response.headers.append(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization'
    );
    response.headers.append('Access-Control-Allow-Credentials', 'true'); // Required for cookies
    return response;
  }

  // Protect /admin routes
  if (url.pathname.startsWith('/admin') && !authToken && !freshLogin) {
    const callbackUrl = encodeURIComponent(url.href);
    return NextResponse.redirect(
      new URL(`/login?callbackUrl=${callbackUrl}`, request.url)
    );
  }

  // If this is a fresh login, allow the request but clear the fresh_login cookie
  if (freshLogin) {
    const response = NextResponse.next();
    response.cookies.delete('fresh_login');
    return response;
  }

  // Add CORS headers to all responses
  const response = NextResponse.next();
  response.headers.append(
    'Access-Control-Allow-Origin',
    'http://localhost:3000' //change in prod
  );
  response.headers.append('Access-Control-Allow-Credentials', 'true'); // Required for cookies
  return response;
}

export const config = {
  matcher: ['/api/:path*', '/admin/:path*']
};
