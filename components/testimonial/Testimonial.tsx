'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MaxWidthWrapper from '@/app/maxWidthWrapper';
import TestimonialCard from './TestimonialCard';
import { testimonials } from '@/config/testimonial';
import { cn } from '@/lib/utils';
import { useWindowResizer } from '@/hooks/useWindowResizer';

export default function Testimonial() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const { cardsPerView } = useWindowResizer();
  const [containerWidth] = useState<number>(0);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  useEffect(() => {
    const maxIndex = Math.max(0, testimonials.length - cardsPerView);
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [cardsPerView, currentIndex]);

  const maxIndex = Math.max(0, testimonials.length - cardsPerView);
  const isAtStart = currentIndex === 0;
  const isAtEnd = currentIndex === maxIndex;

  const scrollToIndex = (index: number) => {
    const container = scrollContainerRef.current;
    if (container) {
      const cardWidth = getCardWidth();
      const scrollPosition = index * (cardWidth + 24); // 24px is the gap
      container.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  };

  const prevSlide = () => {
    if (!isAtStart) {
      const newIndex = Math.max(0, currentIndex - 1);
      setCurrentIndex(newIndex);
      scrollToIndex(newIndex);
    }
  };

  const nextSlide = () => {
    if (!isAtEnd) {
      const newIndex = Math.min(maxIndex, currentIndex + 1);
      setCurrentIndex(newIndex);
      scrollToIndex(newIndex);
    }
  };

  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50; // minimum distance for swipe

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }

    // Reset values
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const getCardWidth = () => {
    const gap = 24;
    let availableWidth = containerWidth;

    if (containerWidth >= 768) {
      availableWidth -= 48;
    } else {
      availableWidth -= 90;
    }

    const totalGaps = cardsPerView - 1;
    const totalGapWidth = totalGaps * gap;
    return (availableWidth - totalGapWidth) / cardsPerView;
  };

  return (
    <div className="mt-40 mb-20 pl-10">
      <MaxWidthWrapper>
        <div className="max-w-[699px] mx-auto text-center mb-8 px-4">
          <p className="font-semibold text-2xl md:text-[3rem] mb-2 text-[#7065F0]">
            Reviews
          </p>
          <p className="text-xl md:text-2xl text-[#000929] first-letter:capitalize font-semibold">
            Hear from our community:
          </p>
          <p className="text-xl md:text-2xl text-[#000929] first-letter:capitalize">
            Discover what Property managers, Landlords, and Tenants are saying
            about their experience. <br />
            Real stories. Real feedback.
          </p>
        </div>

        <div>
          <div className="w-fit ml-auto flex items-center space-x-8 mb-8 px-4">
            <button
              onClick={prevSlide}
              disabled={isAtStart}
              aria-label="Go to previous slide"
              className={cn(
                'rounded-full bg-[#ffffff] shadow-md shadow-black/40 p-2 flex items-center justify-center cursor-pointer transition-transform duration-300',
                !isAtStart && 'hover:shadow-sm',
                isAtStart && 'opacity-50 cursor-not-allowed'
              )}
            >
              <ChevronLeft className="text-[#0F0F0F]" />
            </button>

            <button
              onClick={nextSlide}
              disabled={isAtEnd}
              aria-label="Go to next slide"
              className={cn(
                'rounded-full bg-[#ffffff] shadow-md shadow-black/40 p-2 flex items-center justify-center cursor-pointer transition-transform duration-300',
                !isAtEnd && ' hover:shadow-sm',
                isAtEnd && 'opacity-50 cursor-not-allowed'
              )}
            >
              <ChevronRight className="text-[#0F0F0F]" />
            </button>
          </div>

          <div
            ref={scrollContainerRef}
            className="relative overflow-x-auto px-4 md:px-6 w-full scroll-smooth"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{
              scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            <div className="flex gap-6">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.name + index}
                  className={`flex-shrink-0 transition-opacity duration-300
                  ${
                    index >= currentIndex && index < currentIndex + cardsPerView
                      ? 'opacity-100'
                      : 'opacity-50'
                  }`}
                  style={{
                    width: `${getCardWidth()}px`,
                    scrollSnapAlign: 'start'
                  }}
                >
                  <TestimonialCard {...testimonial} />
                </div>
              ))}
            </div>
          </div>

          {/* mobile navigation */}
          <div className="flex justify-center mt-4 space-x-2 md:hidden">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors duration-200 
                ${currentIndex === index ? 'bg-[#7065F0]' : 'bg-gray-300'}`}
                onClick={() => {
                  setCurrentIndex(index);
                  scrollToIndex(index);
                }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
