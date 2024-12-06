'use client';

import { houseListing } from '@/config/houseListing';
import React from 'react';
import HouseListingCard from './HouseListingCard';
import MaxWidthWrapper from '@/app/maxWidthWrapper';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export default function BasedOnYourLocation() {
  return (
    <div className="mt-10">
      <MaxWidthWrapper>
        <div className="max-w-[699px] mx-auto flex flex-col space-y-2 items-center mb-8">
          <p className="first-letter:capitalize font-semibold text-[1.5rem] md:text-[3rem] text-[#7065F0]">
            Based on your location
          </p>
          <p className="first-line:capitalize text-[1rem] md:text-[2rem] leading-[44.4px] text-center text-[#000929]">
            We help you with amazing and intuitive designs and also provide
            susceptible database
          </p>
        </div>
        {/* house listing */}
        {/* clicking on facorite takes you the listing. work on it. */}
        <div className="grid sm:grid-cols-[repeat(auto-fill,_minmax(330px,_1fr))] gap-6 pb-8">
          {houseListing.map((house) => (
            <HouseListingCard
              key={house.id}
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
          ))}
        </div>
        <div className="flex items-center justify-center w-full my-10">
          <Button className={cn('h-[72px] text-xl capitalize')}>
            view more <ArrowRight size={32} className="h-8 w-8" />
          </Button>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
