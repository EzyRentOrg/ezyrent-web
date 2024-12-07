import React, { useEffect, useState } from 'react';
import { houseListing } from '@/config/houseListing';
import HouseListingCard from './ui/house-listing-card';
import MaxWidthWrapper from '@/app/maxWidthWrapper';
import { Button } from './ui/button';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export default function BestDeal() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationDirection, setAnimationDirection] = useState<
    'slideRight' | 'slideLeft'
  >('slideRight');
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [screenWidth, setScreenWidth] = useState(0);

  const itemsPerPage = isLargeScreen ? 4 : 3;
  const isAtStart = currentIndex === 0;
  const isAtEnd = currentIndex + itemsPerPage >= houseListing.length;

  useEffect(() => {
    const updateScreenWidth = () => {
      const width = window.innerWidth;
      setScreenWidth(width);
      setIsLargeScreen(width >= 1440);
    };

    // Only run this effect in the client-side
    if (typeof window !== 'undefined') {
      updateScreenWidth();
      window.addEventListener('resize', updateScreenWidth);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', updateScreenWidth);
      }
    };
  }, []);

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
    <MaxWidthWrapper>
      <section
        className="mt-40 px-10"
        aria-labelledby="location-houses-heading"
      >
        <div className="flex items-center w-full mb-10">
          <h3
            id="location-houses-heading"
            className="first-letter:capitalize font-semibold text-[1.5rem] text-[#7065F0]"
          >
            Best deals
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
                title={house.title}
                address={house.address}
                image={house.image}
                bedrooms={house.bedrooms}
                bathrooms={house.bathrooms}
                sqrFt={house.sqrFt}
                price={house.price}
                popular={house.popular}
              />
            </div>
          ))}
        </div>

        <div className="my-10 w-[299px] mx-auto rounded-[40px]">
          <Button
            aria-label="View more listings"
            className={cn('h-[72px] text-xl capitalize w-full rounded-[40px]')}
          >
            View more <ArrowRight size={32} className="h-8 w-8" />
          </Button>
        </div>
      </section>
    </MaxWidthWrapper>
  );
}
