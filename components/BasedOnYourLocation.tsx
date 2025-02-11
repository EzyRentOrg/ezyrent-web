import React, { useState, useCallback, useEffect } from 'react';
import HouseListingCard from './ui/house-listing-card';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useWindowResizer } from '@/hooks/useWindowResizer';
import Link from 'next/link';
import { LoadingState, ErrorState, EmptyState } from './propertyState';

export default function BasedOnYourLocation() {
  const [houseListing, setHouseListing] = useState<HouseListing[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [animationDirection, setAnimationDirection] = useState<
    'slideRight' | 'slideLeft'
  >('slideRight');

  const { isLargeScreen } = useWindowResizer();

  // make api call
  const fetchProperties = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/fetch-listing`, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch properties: ${response.statusText}`);
      }

      const {
        data: { data }
      } = await response.json();
      setHouseListing(data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to fetch properties';
      console.error('Error fetching properties:', err);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  const itemsPerPage = isLargeScreen ? 6 : 3;
  const isAtStart = currentIndex === 0;
  const isAtEnd = currentIndex + itemsPerPage >= houseListing.length;

  const handlePrev = () => {
    if (!isAtStart) {
      setAnimationDirection('slideLeft');
      setCurrentIndex((prev) => prev - itemsPerPage);
    }
  };

  const handleNext = () => {
    if (!isAtEnd) {
      setAnimationDirection('slideRight');
      setCurrentIndex((prev) => prev + itemsPerPage);
    }
  };

  const visibleHouses = houseListing.slice(
    currentIndex,
    currentIndex + itemsPerPage
  );

  return (
    <section
      className="max-w-[1440px] mx-auto py-10 lg:py-20 px-5 md:px-10 lg:px-20 "
      aria-labelledby="location-houses-heading"
    >
      <div className="flex items-center w-full">
        <h3
          id="location-houses-heading"
          className="first-letter:capitalize font-semibold md:text-[1.5rem] text-[#7065F0]"
        >
          Based on your location
        </h3>
        <div className="flex items-center space-x-10 ml-auto">
          <button
            onClick={handlePrev}
            disabled={isAtStart}
            aria-label="Previous houses"
            className={cn(
              'rounded-full bg-[#ffffff] shadow-md shadow-black/40 p-2 flex items-center justify-center cursor-pointer transition-transform duration-300',
              !isAtStart && 'hover:shadow-sm',
              isAtStart && 'opacity-50 cursor-not-allowed'
            )}
          >
            <ChevronLeft />
          </button>

          <button
            onClick={handleNext}
            disabled={isAtEnd}
            aria-label="Next houses"
            className={cn(
              'rounded-full bg-[#ffffff] shadow-md shadow-black/40 p-2 flex items-center justify-center cursor-pointer transition-transform duration-300',
              !isAtEnd && ' hover:shadow-sm',
              isAtEnd && 'opacity-50 cursor-not-allowed'
            )}
          >
            <ChevronRight />
          </button>
        </div>
      </div>

      <div className="flex flex-col justify-center">
        {loading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState message={error} onRetry={fetchProperties} />
        ) : visibleHouses.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="mt-5 grid sm:grid-cols-[repeat(auto-fill,_minmax(280px,_1fr))] gap-6 p-2">
            {visibleHouses.map((house, index) => (
              <div
                key={house.id}
                className={cn(
                  'transition-transform duration-500 ease-in-out transform hover:scale-[1.01] border border-[#00092926] rounded-lg shadow-md',
                  `animate-${animationDirection}`
                )}
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <HouseListingCard
                  id={house.id}
                  name={house.name}
                  address={house.address}
                  mainImage={house.mainImage}
                  beds={house.beds}
                  bathrooms={house.bathrooms}
                  landSize={house.landSize}
                  price={house.price}
                  popular={house.popular}
                  description={house.description}
                />
              </div>
            ))}
          </div>
        )}
      </div>
      {(visibleHouses.length > 0 || !loading) && (
        <Link
          href="/property-listing"
          aria-label="View more listings"
          className={cn(
            'flex items-center justify-center text-white bg-black hover:bg-opacity-85 transition-colors duration-100 ease-in-out px-6 py-3 h-[72px] text-xl mt-10 w-[299px] mx-auto capitalize rounded-[40px]'
          )}
        >
          View more <ArrowRight size={32} className="h-8 w-8" />
        </Link>
      )}
    </section>
  );
}
