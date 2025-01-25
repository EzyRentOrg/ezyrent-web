'use client';

import React, { useRef, useState } from 'react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { ArrowRight, PlayCircle, PauseCircle } from 'lucide-react';
import MaxWidthWrapper from '@/app/maxWidthWrapper';
import Link from 'next/link';

const StartYourJourney: React.FC = () => {
  // Initialize refs for each video
  const videoRefs = [
    useRef<HTMLVideoElement>(null),
    useRef<HTMLVideoElement>(null),
    useRef<HTMLVideoElement>(null),
    useRef<HTMLVideoElement>(null)
  ];

  const [isPlaying, setIsPlaying] = useState<boolean[]>(Array(4).fill(false));

  const togglePlay = (index: number) => {
    const newIsPlaying = [...isPlaying];
    const video = videoRefs[index].current;

    if (video) {
      if (video.paused) {
        video.play();
        newIsPlaying[index] = true;
      } else {
        video.pause();
        newIsPlaying[index] = false;
      }
      setIsPlaying(newIsPlaying);
    } else {
      // console.error(`Video reference at index ${index} is undefined`);
    }
  };

  return (
    <div className="my-10">
      <MaxWidthWrapper>
        {/* Video content */}
        <div className="my-10 w-full md:h-[496px] grid md:grid-cols-2 gap-5">
          <div className="relative rounded-lg w-full border h-[250px] md:h-full overflow-hidden">
            <video
              ref={videoRefs[0]}
              src="/video/house1.mp4"
              className="w-full h-full object-cover"
              loop
              muted
            />
            <button
              onClick={() => togglePlay(0)}
              className="absolute inset-0 grid place-items-center bg-black bg-opacity-50 transition-opacity hover:bg-opacity-40"
            >
              {isPlaying[0] ? (
                <PauseCircle stroke="#f3f3f3" size={60} />
              ) : (
                <PlayCircle stroke="#f3f3f3" size={60} />
              )}
            </button>
          </div>

          <div className="w-full h-full grid md:grid-cols-2 gap-5">
            <div className="relative rounded-lg w-full h-[250px] md:h-full overflow-hidden">
              <video
                ref={videoRefs[1]}
                src="/video/house2.mp4"
                className="w-full h-full object-cover"
                loop
                muted
              />
              <button
                onClick={() => togglePlay(1)}
                className="absolute inset-0 grid place-items-center bg-black bg-opacity-50 transition-opacity hover:bg-opacity-40"
              >
                {isPlaying[1] ? (
                  <PauseCircle stroke="#f3f3f3" size={60} />
                ) : (
                  <PlayCircle stroke="#f3f3f3" size={60} />
                )}
              </button>
            </div>
            <div className="w-full h-full grid md:grid-rows-2 gap-5">
              {[2, 3].map((index) => (
                <div
                  key={index}
                  className="relative rounded-lg w-full h-[250px] md:h-full overflow-hidden"
                >
                  <video
                    ref={videoRefs[index]}
                    src={`/video/house${index + 1}.mp4`}
                    className="w-full h-full object-cover"
                    loop
                    muted
                  />
                  <button
                    onClick={() => togglePlay(index)}
                    className="absolute inset-0 grid place-items-center bg-black bg-opacity-50 transition-opacity hover:bg-opacity-40"
                  >
                    {isPlaying[index] ? (
                      <PauseCircle stroke="#f3f3f3" size={60} />
                    ) : (
                      <PlayCircle stroke="#f3f3f3" size={60} />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <p className="max-w-[632px] mx-auto capitalize text-2xl md:text-[3rem] font-semibold md:leading-[67.2px] text-[#000929] text-center">
            Let’s Start Your Real Estate Journey Today
          </p>
          <div className="flex items-center justify-center w-full my-10">
            <Link href={'/contact'}>
              <Button className={cn('h-[72px] text-xl ')}>
                Send us a Message <ArrowRight size={32} className="h-8 w-8" />
              </Button>
            </Link>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default StartYourJourney;
