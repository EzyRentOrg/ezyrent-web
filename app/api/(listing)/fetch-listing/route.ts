import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    // Get URL search params
    const searchParams = req.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const filter = searchParams.get('filter') || '{}';
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    // Validate parameters
    if (page < 1) return new Response('Invalid page number', { status: 400 });
    if (limit < 1 || limit > 100)
      return new Response('Invalid limit value', { status: 400 });

    // Construct query parameters
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(search && { search }),
      ...(filter && { filter }),
      ...(sortBy && { sortBy }),
      ...(sortOrder && { sortOrder })
    });

    // Fetch data from your API
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/properties?${queryParams}`,
      {
        headers: {
          'Content-Type': 'application/json'
          // Add any additional headers here (e.g., authentication)
        }
      }
    );

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error('Error fetching listings:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
