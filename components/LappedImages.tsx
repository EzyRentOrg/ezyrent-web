import React from 'react';
import Image from 'next/image';
import { lappedImages } from '@/config';

export default function LappedImages() {
  return (
    <div className="bg-[#F8F8F8] rounded-[20px] py-4 px-5 lg:px-10 mt-auto w-full">
      <div className="flex items-center w-full ">
        <div className="flex items-center -space-x-4 ">
          {lappedImages.map((image, index) => (
            <div
              key={image.src + index}
              className=" rounded-full size-[40px] lg:size-[59px] border-[2px] border-white"
            >
              <Image
                src={`/${image.src}`}
                width={image.width}
                height={image.height}
                alt={image.alt}
                className="size-full rounded-full object-cover border-[2px] border-white"
              />
            </div>
          ))}
        </div>
        <div className="ml-4">
          <p className="text-[#344054] text-[0.7rem] md:text-[1.125rem] font-semibold leading-[25.2px] first-letter:capitalize">
            Making your next home easy
          </p>
          <p className="text-[0.6rem] md:text-[#0.875rem] text-[#98A2B3] leading-[19.6px]">
            Join 200k people to find a Home
          </p>
        </div>

        <div className="size-[40px] lg:size-[59px] ml-auto text-[#667085]">
          <Image
            src={'/icons/arrow-up-right_59x59.svg'}
            width={59}
            height={59}
            alt="Circled right arrow."
            className="size-full object-cover "
          />
        </div>
      </div>
    </div>
  );
}
