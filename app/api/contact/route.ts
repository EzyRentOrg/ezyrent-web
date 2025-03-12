import { NextRequest, NextResponse } from 'next/server';

interface Payload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();
    const payload: { [key: string]: Payload } = {
      name,
      email,
      subject,
      message
    };

    const requiredFields: (keyof typeof payload)[] = [
      'name',
      'email',
      'subject',
      'message'
    ];

    // Check for missing fields
    const missingFields = requiredFields.filter((field) => !payload[field]);

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: `Missing required fields: ${missingFields.join(', ')}`
        },
        { status: 400 }
      );
    }

    // Send request to backend
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/contact`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }
    );

    const result = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: result.message || 'Failed to deliver message' },
        { status: response.status || 500 }
      );
    }

    return NextResponse.json(
      { message: result.message || 'Message sent!' },
      { status: result.statusCode || 200 }
    );
  } catch (error) {
    console.error('Error handling POST request:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
