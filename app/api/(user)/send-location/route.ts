import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { latitude, longitude } = await request.json();

    // Process the location data (e.g., save to database, fetch location-based content)
    console.log('Received location:', { latitude, longitude });

    // Example: Fetch location-based content
    const content = await fetchLocationBasedContent(latitude, longitude);

    return NextResponse.json({ success: true, content });
  } catch (error) {
    console.error('Error processing location:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process location' },
      { status: 500 }
    );
  }
}

// Mock function to fetch location-based content
async function fetchLocationBasedContent(latitude: number, longitude: number) {
  // Replace this with your logic to fetch content based on location
  return { message: 'Content for your location', latitude, longitude };
}
