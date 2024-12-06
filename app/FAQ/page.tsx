import React from 'react';
import MaxWidthWrapper from '../maxWidthWrapper';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function FAQ() {
  return (
    <MaxWidthWrapper className="">
      <div className="text-center mt-10">
        <p className="text-[#7065F0] text-5xl font-semibold leading-10 mb-3">
          Frequently Asked Questions
        </p>
        <span className="text-[#4D4D4D] text-3xl leading-8 font-normal">
          Need answers? We got them.
        </span>
      </div>
      {/* search */}
      <div className="relative max-w-[720px] my-10 mx-auto flex ">
        <Input
          placeholder="When is the best period to rent a house in Abuja?"
          className="h-14 pr-24 !text-xl text-[#999999]"
        />
        <div className="absolute right-0 flex items-center justify-between px-4 py-2 h-full w-[100px] ">
          <Separator orientation="vertical" className="bg-[#E6E6E6] !w-[2px]" />
          <button type="button">
            <Search size={36} color="#7065F0" className='h-8 w-8' />
          </button>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
