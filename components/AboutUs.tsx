import MaxWidthWrapper from '@/app/maxWidthWrapper';
import { cn } from '@/lib/utils/cn';
import Image from 'next/image';
import React from 'react';

interface WeAreAndWeDo {
  title: string;
  text: string;
}

const weAreAndWeDo: WeAreAndWeDo[] = [
  {
    title: 'who we are',
    text: 'EzyRent is a digital rental solution designed to transform the property rental market starting in Nigeria, and aiming to expand across the African continent'
  },
  {
    title: 'what we do',
    text: 'EzyRent will streamline the renting process, making it easier for tenants to find properties, and for landlords to manage listings and rentals efficiently'
  }
];

export default function AboutUs() {
  return (
    <div className="my-10 md:mt-20 lg:my-40">
      <MaxWidthWrapper className="">
        <div className="max-w-[42em] text-center mx-auto">
          <h2 className="capitalize text-[#000929] font-semibold text-[1.5rem] md:text-5xl leading-[67.2px] ">
            about us
          </h2>
          <p className="first-letter:capitalize md:text-[2rem] w-[70%] lg:w-full mx-auto">
            get an insight <span className="text-[#7065F0]">who we are</span>{' '}
            and <span className="text-[#7065F0]">what we do</span>
          </p>
        </div>
        <div>
          {/* mission and vission */}
          <div className="my-5 md:my-20 lg:flex w-full">
            {/* right side */}
            <div className="lg:w-[60%]">
              <h3 className="text-[1.5rem] md:text-[2.5rem] text-center leading-[56px] ">
                <span className="text-[#7065F0]">Our Mission</span> &{' '}
                <span className="text-[#7065F0]">Vision</span>
              </h3>
              <p className="md:text-[1.7rem] text-center md:text-left">
                The objective of EzyRent is to build a scalable, user-friendly,
                and efficient platform that solves renting issues in Nigeria and
                eventually throughout Africa. By targeting a wide audience of
                landlords, property managers, and tenants, EzyRent seeks to
                become a trusted platform that grows organically through user
                satisfaction and word-of-mouth, while scaling technologically to
                accommodate increased demand as the platform expands across
                borders
              </p>
            </div>

            {/* left side */}
            <div className="lg:w-[35%] ml-auto h-[240px] md:h-[440px] lg:h-auto mt-5 md:mt-10 rounded-lg bg-[url('/aboutImage_384x415.webp')] bg-cover bg-center flex items-center">
              <div className="flex z-[2] w-full about-image-gradient about-image-box-shadow about-image-backdrop mt-auto font-bold  flex-col items-center text-[#f1f1f1] ">
                <div className="w-10 h-10 ">
                  <Image
                    src={'/cursor-pointer.svg'}
                    alt="cursor pointer."
                    width={40}
                    height={40}
                    className="w-full h-full"
                  />
                </div>
                <p className="px-2 text-xs sm:text-sm md:text-xl leading-[30px] text-center">
                  <span className="font-bold inline-block ">
                    Listed Properties at affordable prices
                  </span>
                  <br /> Join us today to find a home that suits you!
                </p>
              </div>
            </div>
          </div>

          {/* who we are and what we do */}
          <div className="flex flex-col md:flex-row space-y-10 md:space-y-0 items-center w-full">
            {weAreAndWeDo.map((content, index) => (
              <div
                key={content.title + index}
                className={cn(
                  'max-w-[527px] ',
                  content.title === 'what we do' && 'md:ml-auto'
                )}
              >
                <p className="capitalize text-center text-[2rem] font-semibold text-[#7065F0] leading-[44px] mb-4">
                  {content.title}
                </p>
                <p className="text-[1.25rem] text-center md:text-left leading-[33.1px] text-[#000929]">
                  {content.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
