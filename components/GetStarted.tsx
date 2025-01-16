import MaxWidthWrapper from '@/app/maxWidthWrapper';
import React from 'react';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function GetStarted() {
  return (
    <section className="my-10">
      <MaxWidthWrapper className="">
        <div className="max-w-[699px] mx-auto text-center mb-8 px-4">
          <p className="capitalize text-[#7065F0] font-semibold text-[2rem] md:text-4xl md:leading-[67.2px]">
            Ready to Buy or rent your dream property
          </p>
          <p className=" text-[1rem] md:text-2xl text-[#000929] first-letter:capitalize">
            Download the app on google Play Store or Apple Store to get amazing
            deals
          </p>
        </div>
        <div className="my-10 w-[299px] mx-auto rounded-[40px]">
          <Link href={'/'}>
            <Button
              aria-label="Get Started with App"
              className={cn(
                'h-[72px] text-xl capitalize w-full rounded-[40px]'
              )}
            >
              Get Started <ArrowRight size={32} className="h-8 w-8" />
            </Button>
          </Link>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
