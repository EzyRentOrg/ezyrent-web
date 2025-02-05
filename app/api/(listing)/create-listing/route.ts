import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  try {
    // Get auth token from cookies
    const cookieStore = await cookies();
    const token = cookieStore.get('ezyrent_auth_token')?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Authentication required' },
        { status: 401 }
      );
    }

    // Parse the incoming FormData
    const formData = await req.formData();

    const requiredFields = [
      'name',
      'address',
      'price',
      'description',
      'beds',
      'bathrooms',
      'mainImage',
      'rentDuration',
      'propertyType',
      'landSize',
      'location'
    ];

    const missingFields = requiredFields.filter((field) => {
      const value = formData.get(field);
      return !value || (Array.isArray(value) && value.length === 0);
    });

    // Check amenities since it's an array
    const amenities = formData.getAll('amenities[]');
    if (!amenities || amenities.length === 0) {
      missingFields.push('amenities');
    }

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: `Missing required fields: ${missingFields.join(', ')}`
        },
        { status: 400 }
      );
    }

    // Make the API call to your backend with auth token
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/properties`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      }
    );

    if (!response.ok) {
      const errorData = await response.json();

      // Handle specific auth errors
      if (response.status === 401 || response.status === 403) {
        return NextResponse.json(
          { success: false, message: 'Authentication failed' },
          { status: response.status }
        );
      }

      return NextResponse.json(
        {
          success: false,
          message: errorData.message || 'Failed to create listing'
        },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (error) {
    console.error('Error creating listing:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
