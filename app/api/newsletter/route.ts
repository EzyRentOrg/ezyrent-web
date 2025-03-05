import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    // Validate email
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Save the email to the database (External API Call)
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/newsletter`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      }
    );

    const result = await response.json();

    // Check if the request failed
    if (!result.success) {
      return NextResponse.json(
        { error: result.message || 'Subscription failed' },
        { status: result.statusCode }
      );
    }

    return NextResponse.json(
      { message: result.message || 'Successfully subscribed!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
