'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '../components/Layouts';
import HouseListingCard from '@/components/ui/house-listing-card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import PropertyFilterDialog from '@/components/PropertyFilterDialog';
import { getCleanImageUrl } from '@/lib/getCleanImageUrl';
import { useDebounce } from '@/hooks/useDebounce';
import {
  LoadingState,
  Pagination,
  ErrorState,
  EmptyState
} from '@/components/propertyState';
import { ITEMS_PER_PAGE } from '../constants';
import { FilterControls } from '@/components/FilterControls';

export default function PropertyManagement() {
  const router = useRouter();
  const [properties, setProperties] = useState<HouseListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [filterParams, setFilterParams] = useState<FilterParams>({
    propertyType: 'all',
    sortBy: 'createdAt',
    sortOrder: 'desc',
    minPrice: undefined,
    maxPrice: undefined
  });

  const debouncedSearch = useDebounce(search, 500);

  // const constructFilterObject = useCallback(() => {
  //   const filter: Record<string, any> = {};

  //   // if (filterParams.propertyType !== 'all') {
  //   //   filter.category = filterParams.propertyType;
  //   // }

  //   if (filterParams.minPrice !== undefined) {
  //     filter.minPrice = filterParams.minPrice;
  //   }

  //   if (filterParams.maxPrice !== undefined) {
  //     filter.maxPrice = filterParams.maxPrice;
  //   }

  //   return filter;
  // }, [filterParams]);

  const fetchProperties = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // const filterObject = constructFilterObject();
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: ITEMS_PER_PAGE.toString(),
        ...(debouncedSearch && { search: debouncedSearch }),
        sortBy: filterParams.sortBy,
        sortOrder: filterParams.sortOrder,
        category: filterParams.propertyType
        // filter: JSON.stringify(filterObject),
      });

      const response = await fetch(`/api/fetch-listing?${queryParams}`, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch properties: ${response.statusText}`);
      }

      const {
        data: { data, totalPages: pages }
      } = await response.json();
      setProperties(data);
      setTotalPages(pages);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to fetch properties';
      console.error('Error fetching properties:', err);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [page, debouncedSearch, filterParams]);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  const handleFilterChange = (updates: Partial<FilterParams>) => {
    setFilterParams((prev) => ({ ...prev, ...updates }));
    setPage(1); // Reset to first page when filters change
  };

  return (
    <DashboardLayout
      title="Property Management"
      btnTitle="Add Property"
      handleClick={() =>
        router.push('/admin/property-management/create-listing')
      }
      sidebarProps={{ onSidebarHoverChange: setIsSidebarExpanded }}
    >
      <div className="flex flex-1 flex-col min-h-screen">
        {/* Search Bar */}
        <div
          className={`fixed top-[105px] md:top-[115px] lg:top-[125px] right-0 bg-white/80 backdrop-blur-sm shadow-sm z-10 transition-all duration-300 left-0 ${
            isSidebarExpanded ? 'left-[205px]' : 'lg:left-[60px]'
          }`}
        >
          <div className="px-5 py-4 flex gap-5 items-center w-full">
            <div className="space-y-2 w-full max-w-xs">
              <Label className="hidden md:block">Search</Label>
              <Input
                disabled={loading}
                placeholder="Search properties..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border md:mt-2"
              />
            </div>
            <div className="md:hidden ">
              <PropertyFilterDialog
                onFilterChange={handleFilterChange}
                currentFilters={filterParams}
              />
            </div>
            <div className="hidden md:block">
              <FilterControls
                handleFilterChange={handleFilterChange}
                filterParams={filterParams}
              />
            </div>
          </div>
        </div>

        {/* Property Grid */}
        <div className="w-full mt-28 mb-10 px-5">
          {loading ? (
            <LoadingState />
          ) : error ? (
            <ErrorState message={error} onRetry={fetchProperties} />
          ) : properties.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {properties.map((property) => (
                <HouseListingCard
                  key={property.id}
                  {...property}
                  mainImage={getCleanImageUrl(
                    property.mainImage || '/fallback-image.jpg'
                  )}
                />
              ))}
            </div>
          )}
        </div>

        {/* Pagination */}
        {!error && properties.length > 0 && (
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
