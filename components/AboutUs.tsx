import MaxWidthWrapper from '@/app/maxWidthWrapper';
import React from 'react';

export default function AboutUs() {
  return (
    <div className="my-10 md:mt-20 lg:my-40">
      <MaxWidthWrapper className="">
        <div className="max-w-[42em] text-center mx-auto">
          <h2 className="capitalize text-[#7065F0] font-semibold text-[1.5rem] md:text-5xl leading-[67.2px] ">
            about us
          </h2>
          <p className="mt-2 capitalize text-[#000929] font-[500] leading-[44px] text-3xl md:text-[2rem] w-[70%] lg:w-full mx-auto">
            Discover Our Story and Mission
          </p>
        </div>
        <p className="text-[#000929] mt-10 font-normal text-2xl max-w-[944px] mx-auto">
          <span className="font-semibold">EzyRent </span>is revolutionizing
          property rentals across Nigeria and Africa. Making it seamless to
          find, rent or sell homes from anywhere in the world. With user-first
          approach, we eliminate the hassle of agent fees and bring transparency
          , convenience, and security to the rental process - all from the
          comfort of your home.
        </p>
      </MaxWidthWrapper>
    </div>
  );
}
