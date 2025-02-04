'use client';
import React, { useEffect, useState, useCallback } from 'react';
import DashboardLayout from '../components/Layouts';
import { useRouter } from 'next/navigation';
import HouseListingCard from '@/components/ui/house-listing-card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { getCleanImageUrl } from '@/lib/getCleanImageUrl';

export default function PropertyManagement() {
  const router = useRouter();
  const [properties, setProperties] = useState<
    (HouseListing & { mainImage: string })[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');

  // Fix: Use useCallback properly
  const fetchProperties = useCallback(async () => {
    try {
      setLoading(true);
      setError(false);

      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: '10',
        ...(search && { search }),
        sortBy,
        sortOrder
      });

      const response = await fetch(`/api/fetch-listing?${queryParams}`);
      if (!response.ok) throw new Error('Failed to fetch');

      const data = await response.json();
      setProperties(data.data.data);
      setTotalPages(data.data.totalPages);
    } catch (error) {
      console.error('Error:', error);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [page, search, sortBy, sortOrder]);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  const handleCreateListing = () => {
    router.push('/admin/property-management/create-listing');
  };

  return (
    <DashboardLayout
      title={'Property Management'}
      btnTitle={'Add Property'}
      handleClick={handleCreateListing}
    >
      <div className="flex flex-col h-screen px-5">
        {/* Search and Filter Controls */}
        <div className="flex gap-4 items-center mt-4 mb-10">
          <Input
            disabled={loading}
            placeholder="Search properties..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-xs"
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-40"
          >
            <option value="createdAt">Date Added</option>
            <option value="price">Price</option>
            <option value="title">Title</option>
          </select>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="w-40"
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>

        {/* Properties Grid or Error */}
        {loading ? (
          <div className="text-center flex-1 flex items-center justify-center text-lg font-semibold">
            Fetching properties<span className="animate-pulse">...</span>
          </div>
        ) : error ? (
          <div className="text-center flex-1 flex flex-col items-center justify-center">
            <p className="text-red-500 font-semibold">
              Failed to fetch properties.
            </p>
            <Button onClick={fetchProperties} className="mt-4">
              Retry
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {properties.map((property) => (
              <HouseListingCard
                key={property.id}
                {...property}
                image={getCleanImageUrl(
                  property.mainImage || '/fallback-image.jpg'
                )}
              />
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        {!error && (
          <div className="mt-auto flex justify-center gap-2">
            <Button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              variant="outline"
            >
              Previous
            </Button>
            <span className="py-2 px-4">
              Page {page} of {totalPages}
            </span>
            <Button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              variant="outline"
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
