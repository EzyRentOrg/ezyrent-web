'use client';

import { useState, useEffect, useRef } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import ClientLayout from '@/app/clientLayout';
import TestimonialCard from './TestimonialCard';
import { testimonials } from '@/config/testimonial';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils/cn';

export default function Testimonial() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [cardsPerView, setCardsPerView] = useState<number>(1);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  useEffect(() => {
    const updateLayout = () => {
      setContainerWidth(window.innerWidth);
      if (window.innerWidth <= 640) {
        setCardsPerView(1);
      } else if (window.innerWidth < 1024) {
        setCardsPerView(2);
      } else {
        setCardsPerView(3);
      }
    };

    updateLayout();
    window.addEventListener('resize', updateLayout);
    return () => window.removeEventListener('resize', updateLayout);
  }, []);

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
      availableWidth -= 32;
    }

    const totalGaps = cardsPerView - 1;
    const totalGapWidth = totalGaps * gap;
    return (availableWidth - totalGapWidth) / cardsPerView;
  };

  return (
    <div className="my-10">
      <ClientLayout>
        <div className="max-w-[699px] mx-auto text-center mb-8 px-4">
          <p className="font-semibold text-2xl md:text-3xl text-[#7065F0]">
            Testimonial
          </p>
          <p className="text-xl md:text-2xl text-[#000929]">
            See what our property managers, landlords, and tenants have to say
          </p>
        </div>

        <div>
          <div className="w-full flex justify-between mb-8 px-4">
            <Button
              onClick={prevSlide}
              variant="outline"
              disabled={isAtStart}
              aria-label="Go to previous slide"
              className="p-2 rounded-full bg-white transition-all duration-200 
              disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-80"
            >
              <ChevronLeft className="text-[#0F0F0F]" />
            </Button>

            <Button
              onClick={nextSlide}
              variant="outline"
              disabled={isAtEnd}
              aria-label="Go to next slide"
              className="p-2 rounded-full bg-white transition-all duration-200 
              disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-80"
            >
              <ChevronRight className="text-[#0F0F0F]" />
            </Button>
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

        <div className="flex items-center justify-center w-full my-10">
          <Button className={cn('h-[72px] text-xl capitalize')}>
            view more <ArrowRight size={32} className="h-8 w-8" />
          </Button>
        </div>
      </ClientLayout>
    </div>
  );
}
