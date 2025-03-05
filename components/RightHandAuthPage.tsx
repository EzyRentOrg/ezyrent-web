import React from 'react';
import Image from 'next/image';

export default function RightHandAuthPage() {
  return (
    <main className="hidden lg:block w-full h-[964px]">
      <div className="bg-[url('/a-block-of-apartments_2000x1333.png')] bg-no-repeat bg-center rounded-[20px] h-full w-full relative">
        <div className="absolute rounded-[20px] h-full w-full bg-black/40" />
        {/* glassmorphism */}
        <div className="w-[90%] mx-auto pb-5">
          <div className="w-[528px] mx-auto absolute top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%] glassmorphism p-10">
            <h3 className="text-xl font-bold text-[1.25rem] -tracking-[2%] leading-[26.04px] text-white">
              Your Gateway to a Hassle-Free Home Search
            </h3>
            <ul className="list-disc mt-5">
              <li className="font-medium text-[1rem] -tracking-[2%] text-[#F9FAFB]">
                Access 100% verified property listings.
              </li>
              <li className="font-medium text-[1rem] -tracking-[2%] text-[#F9FAFB]">
                AI-driven recommendations tailored to your needs.
              </li>
              <li className="font-medium text-[1rem] -tracking-[2%] text-[#F9FAFB]">
                Safe and transparent transactions every step of the way.
              </li>
            </ul>
            <div className="mt-10 flex items-center space-x-8">
              <p className="font-medium text-[0.8rem] w-[75%] -tracking-[2%] text-[#F9FAFB] italic">
                Start your journey today and join 10k users finding their dream
                spaces with EzyRent.
              </p>
              <div className="size-[80px] ml-auto">
                <Image
                  src={'/icons/arrow-up-right-white_59x59.svg'}
                  width={59}
                  height={59}
                  alt="Circled right arrow."
                  className="size-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
