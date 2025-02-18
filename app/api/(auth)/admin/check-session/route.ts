import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('ezyrent_auth_token')?.value;

  if (!token) {
    return NextResponse.json(
      { success: false, message: 'Session expired' },
      { status: 401 }
    );
  }

  return NextResponse.json({ success: true, message: 'Session valid' });
}
