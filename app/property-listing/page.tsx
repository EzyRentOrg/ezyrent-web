'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Breadcrumb from '@/components/breadcrumb';
import MaxWidthWrapper from '../maxWidthWrapper';
import { useDebounce } from '@/hooks/useDebounce';
import HouseListingCard from '@/components/ui/house-listing-card';
import { getCleanImageUrl } from '@/lib/getCleanImageUrl';
import { FilterControls } from '@/components/FilterControls';
import {
  EmptyState,
  ErrorState,
  LoadingState
} from '@/components/propertyState';
import { ITEMS_PER_PAGE } from '../admin/constants';
import PropertyFilterDialog from '@/components/PropertyFilterDialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export default function PropertyListing() {
  const [properties, setProperties] = useState<HouseListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  // const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
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

  // make api call
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
        data: { data }
      } = await response.json();
      setProperties(data);
      // setTotalPages(pages);
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

  console.log(properties);

  return (
    <section>
      <MaxWidthWrapper>
        <div className="max-w-[1440px] mx-auto pt-10 pb-5 px-5 md:px-10 lg:px-24 fixed lg:top-[75px] right-0 bg-white/80 backdrop-blur-sm shadow-sm z-10 transition-all duration-300 left-0">
          {/* breadcrumb */}
          <div className="w-full">
            <Breadcrumb />
          </div>
          {/* filter */}
          <div className="py-4 flex gap-5 items-center w-full">
            {/* search */}
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
        <div className="w-full pt-40 mb-10 px-5">
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
      </MaxWidthWrapper>
    </section>
  );
}
