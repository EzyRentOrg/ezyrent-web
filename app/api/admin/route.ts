import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function GET(req: NextRequest) {
  // Get token from cookies
  const authToken =
    req.headers.get('x-auth-token') ||
    req.cookies.get('ezyrent_auth_token')?.value;
  console.log('token: ', authToken);

  if (!authToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(
      authToken,
      process.env.NEXT_PUBLIC_JWT_SECRET as string
    );
    console.log('Decoded JWT:', decoded);
    return NextResponse.json({ admin: decoded }, { status: 200 });
  } catch (error) {
    console.log('error: ', error);
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}
