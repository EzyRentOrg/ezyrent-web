import { z } from 'zod';
import { NextResponse } from 'next/server';

// Validation schema
const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required')
});

interface AuthResponse {
  success: boolean;
  message?: string;
  token?: string;
}

export async function POST(req: Request) {
  try {
    // Parse and validate the request body
    const body = await req.json();
    const validated = loginSchema.safeParse(body);

    if (!validated.success) {
      const errorMessages = validated.error.errors.map((err) => err.message);
      return NextResponse.json(
        { success: false, message: errorMessages.join(', ') },
        { status: 400 }
      );
    }

    const { email, password } = validated.data;

    // Send request to backend for authentication
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/admin/auth/login`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      }
    );

    console.log('response: ', response);
    const result: AuthResponse = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { success: false, message: result.message || 'Login failed' },
        { status: response.status }
      );
    }

    if (!result.token) {
      return NextResponse.json(
        { success: false, message: 'Authentication token not received' },
        { status: 400 }
      );
    }

    // Set the secure authentication cookie
    const res = NextResponse.json({ success: true });
    res.cookies.set('ezyrent_auth_token', result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/'
    });

    return res;
  } catch (error) {
    console.error('Login error:', error);

    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
