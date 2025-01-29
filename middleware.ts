import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get('auth_token');

  // Check if the request is for an admin route
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!authToken) {
      // Append the current URL as a callbackUrl query parameter
      const callbackUrl = encodeURIComponent(request.nextUrl.href);
      return NextResponse.redirect(
        new URL(`/login?callbackUrl=${callbackUrl}`, request.url)
      );
    }
  }

  return NextResponse.next(); // Allow the request to proceed if authToken
}

export const config = {
  matcher: ['/admin/:path*'] // Match all admin routes
};
