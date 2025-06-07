import { NextResponse } from 'next/server';

export async function GET() {
  // Extract the property ID from the URL params
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/admin/properties-listed-by-month`
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch property listed by month' },
        { status: 500 }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching property listed by month', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
