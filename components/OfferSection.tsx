import MaxWidthWrapper from '@/app/maxWidthWrapper';
import React from 'react';
import { Button } from './ui/button';
import Image from 'next/image';

export default function OfferSection() {
  return (
    <section className=" w-full bg-[#7065F0] pb-10 pt-10 mt-40 max-h-[701px] overflow-hidden">
      <MaxWidthWrapper className="relative h-auto">
        {/* right section */}
        <div className="text-[#f1f1f1] w-full max-w-[905px] mr-20">
          <p className="text-[2rem] md:text-[3rem] font-[500] md:leading-[67.2px] uppercase">
            EXPERIENCE LUXURY AT HALF THE PRICE!
          </p>
          <p className="text-[1.3rem] md:text-[2.8rem] font-[900] bg-[#f1f1f1] text-[#7065f0] py-2 px-4 rounded-3xl md:leading-[67.2px] w-full uppercase my-5">
            50% OFF PREMIUM RENTALS
          </p>
          <p className="text-[1.5rem] md:text-[3rem] font-[500] md:leading-[67.2px] uppercase">
            EXCLUSIVELY FOR PREMIUM SUBSCRIBERS
          </p>
          <p className="text-[1.5rem] font-[400] leading-[33.6px] first-letter:capitalize my-10">
            This limited-time offer wont last!{' '}
            <span className="md:inline-block">
              Book now to secure your dream home.
            </span>
          </p>
          <Button
            variant={'outline'}
            className="border-[#f1f1f1] rounded-[40px] h-[74px] w-full md:w-[291px] text-[1.75rem] font-normal text-[#f1f1f1] hover:text-[#f1f1f1]/80 transition-colors duration-100 ease-in-out"
          >
            See offer details
          </Button>
        </div>
        {/* left section */}
        <Image
          src={'/offerHouse_1795x1197.png'}
          width={1795}
          height={1197}
          alt="Image of a beautiful"
          className=" top-[50px] left-[500px] absolute"
        />
      </MaxWidthWrapper>
    </section>
  );
}
