'use client';

import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Star
} from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';

const randomRotateY = () => Math.floor(Math.random() * 21) - 10;

export default function TestimonialCard({
  testimonials,
  autoplay = false
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
}) {
  const [active, setActive] = useState<number>(0);

  const handleNext = () =>
    setActive((prev) => (prev + 1) % testimonials.length);
  const handlePrev = () =>
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  const isActive = (index: number): boolean => index === active;

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  if (!testimonials.length) {
    return (
      <div role="alert" className="text-center text-gray-500">
        No testimonials available.
      </div>
    );
  }

  return (
    <div
      className="max-w-sm md:max-w-4xl mx-auto mt-10 md:mt-20 antialiased"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20">
        {/* Image Section */}
        <div>
          <div className="relative h-80 w-full">
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.image + index}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    rotate: randomRotateY()
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    rotate: isActive(index) ? 0 : randomRotateY(),
                    zIndex: isActive(index) ? 999 : 1
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    rotate: randomRotateY()
                  }}
                  transition={{
                    duration: 0.4,
                    ease: 'easeInOut'
                  }}
                  className="absolute inset-0"
                  aria-hidden={!isActive(index)}
                >
                  <Image
                    src={testimonial.image}
                    alt={`${testimonial.name}'s testimonial`}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    width={500}
                    height={500}
                    draggable={false}
                    className="h-full w-full rounded-3xl object-cover object-top"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Text Content */}
        <div className="flex flex-col justify-between pb-4">
          <motion.div
            key={active}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{
              duration: 0.2,
              ease: 'easeInOut'
            }}
          >
            <h3 className="text-[1.5rem] md:text-[2rem] text-[#333333] font-extrabold">
              {testimonials[active].name}
            </h3>
            <p className="capitalize font-medium text-lg text-[#000929] mb-3 sm:mb-4 line-clamp-1">
              {testimonials[active].jobTitle}
            </p>
            <motion.p className="text-sm sm:text-base lg:text-lg font-light text-[#000929]">
              {testimonials[active].quote
                .split(' ')
                .map((word: string, index: number) => (
                  <motion.span
                    key={index}
                    initial={{ filter: 'blur(10px)', opacity: 0, y: 5 }}
                    animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.2,
                      ease: 'easeInOut',
                      delay: 0.02 * index
                    }}
                    className="inline-block"
                  >
                    {word}&nbsp;
                  </motion.span>
                ))}
            </motion.p>

            {/* Star Rating */}
            <div className="flex gap-1 mt-8 md:mt-4">
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={i}
                  fill={i < testimonials[active].star ? '#7065F0' : 'none'}
                  className="text-[#7065F0] w-4 h-4 sm:w-5 sm:h-5"
                />
              ))}
            </div>
          </motion.div>

          {/* Navigation Buttons */}
          <div className="flex gap-4 pt-12 md:pt-4">
            <Button
              onClick={handlePrev}
              aria-label="Previous testimonial"
              className="size-12 rounded-full drop-shadow-lg bg-gray-100 flex items-center justify-center group"
            >
              <ChevronLeft
                stroke={'#212121'}
                size={22}
                className="group-hover:-rotate-12 transition-transform duration-300"
              />
            </Button>
            <Button
              onClick={handleNext}
              aria-label="Next testimonial"
              className="size-12 rounded-full drop-shadow-lg bg-gray-100 flex items-center justify-center group"
            >
              <ChevronRight
                stroke={'#212121'}
                size={22}
                className="group-hover:-rotate-12 transition-transform duration-300"
              />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
