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
  status?: number;
}

export async function POST(req: Request) {
  try {
    // Parse and validate the request body
    const body = await req.json();

    const validated = loginSchema.safeParse(body);

    if (!validated.success) {
      const errorMessages = validated.error.errors.map((err) => err.message);
      console.error('Validation errors:', errorMessages);
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
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ email, password })
      }
    );

    // Try to parse response even if it's an error
    let result: AuthResponse;
    try {
      result = await response.json();
    } catch (error) {
      console.error('Failed to parse response:', error);
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid response from authentication server'
        },
        { status: 500 }
      );
    }

    console.log('Backend response data:', {
      success: result.success,
      hasToken: !!result.token,
      message: result.message
    });

    if (!response.ok) {
      // Enhanced error logging
      console.error('Login failed:', {
        status: response.status,
        message: result.message,
        email // Log email for debugging
      });

      // Special handling for 401
      if (response.status === 401) {
        return NextResponse.json(
          {
            success: false,
            message: 'Invalid credentials or unauthorized access',
            status: 401
          },
          { status: 401 }
        );
      }

      return NextResponse.json(
        { success: false, message: result.message || 'Login failed' },
        { status: response.status }
      );
    }

    if (!result.token) {
      console.error('Authentication token missing in response');
      return NextResponse.json(
        { success: false, message: 'Authentication token not received' },
        { status: 400 }
      );
    }

    // Set the secure authentication cookie
    const res = NextResponse.json({
      success: true,
      message: 'Login successful'
    });

    res.cookies.set('ezyrent_auth_token', result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax', // Changed from 'strict' to 'lax' for better compatibility
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/'
    });

    // Set a fresh login cookie
    res.cookies.set('fresh_login', 'true', {
      maxAge: 60, // Short lived - 1 minute
      path: '/'
    });

    return res;
  } catch (error) {
    console.error('Login error from backend:', error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : 'Internal Server Error'
      },
      { status: 500 }
    );
  }
}
