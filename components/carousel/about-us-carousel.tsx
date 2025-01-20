'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/carousel/carousel';
import { Button } from '@/components/ui/button';
import { PauseIcon, PlayIcon } from 'lucide-react';
import { carouselContent } from '@/config/carousel';

export default function AboutUsCarousel() {
  const [api, setApi] = useState<any>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isPlaying) {
      intervalId = setInterval(() => {
        api?.scrollNext();
      }, 5000); // Change slide every 5 seconds
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [api, isPlaying]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <section className="py-12 bg-gray-100">
      <div className="container min-w-min mx-auto px-4">
        <h1 className="text-center mb-4 text-[#7065F0] font-semibold text-[2.1rem] md:text-5xl md:leading-[67.2px] ">
          App Only Features
        </h1>
        <Carousel
          setApi={setApi}
          className="w-full max-w-xs mx-auto sm:max-w-sm md:max-w-md lg:max-w-lg"
        >
          <CarouselContent>
            {carouselContent.map((item, index) => (
              <CarouselItem className="" key={index}>
                <Card className="border-[#7065F0]">
                  <CardContent className="flex flex-col items-center  text-[#000929]   justify-center p-6 h-[200px]">
                    <h3 className="text-xl md:text-2xl font-semibold mb-2">
                      {item.title}
                    </h3>
                    <p className="text-center">{item.content}</p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex items-center justify-center mt-4 gap-0 md:gap-4">
            <CarouselPrevious className=" border-[#7065F0]" />
            <Button
              variant="outline"
              size="icon"
              className=" w-6 h-6 md:h-8 md:w-8 border-[#7065F0]"
              onClick={togglePlayPause}
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <PauseIcon className="h-4 w-4" />
              ) : (
                <PlayIcon className="h-4 w-4" />
              )}
            </Button>
            <CarouselNext className=" border-[#7065F0]" />
          </div>
          <div className="py-2 text-center text-sm text-muted-foreground">
            Slide {current} of {count}
          </div>
        </Carousel>
      </div>
    </section>
  );
}
