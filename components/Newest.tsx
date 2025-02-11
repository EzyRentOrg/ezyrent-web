import React, { useState } from 'react';
import { houseListing } from '@/config/houseListing';
import HouseListingCard from './ui/house-listing-card';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useWindowResizer } from '@/hooks/useWindowResizer';

export default function Newest() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationDirection, setAnimationDirection] = useState<
    'slideRight' | 'slideLeft'
  >('slideRight');

  const { isLargeScreen } = useWindowResizer();

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
    <section aria-labelledby="location-houses-heading">
      <div className="flex items-center w-full mb-5 mt-10">
        <h3
          id="location-houses-heading"
          className="first-letter:capitalize flex items-center"
        >
          sort by:
          <span className="ml-2 font-semibold capitalize flex items-center">
            newest <ChevronDown />
          </span>
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

      <div className="grid sm:grid-cols-[repeat(auto-fill,_minmax(280px,_1fr))] gap-6 p-2">
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
            />
          </div>
        ))}
      </div>
    </section>
  );
}
