import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '../ui/input';

export default function MobileHeroView() {
  return (
    <header className="overflow-hidden relative min-h-screen bg-[url('/hero/mobileHeroImage.webp')] bg-cover bg-center flex items-center justify-center md:hidden">
      <div className="bg-mobile-gradient absolute inset-0 bg-mobile-box-shadow bg-mobile-backdrop"></div>

      <div className="relative z-10 text-center max-w-md px-4 flex flex-col h-full">
        <h1 className="uppercase text-[2rem] sm:text-[2.5rem] leading-[56px] text-center font-[900] text-white mb-4">
          Find a Home That Suits You
        </h1>
        <p className="text-white mb-8">
          Want to find a home? We are ready to help you find one that suits your
          lifestyle and needs
        </p>

        <div className="relative mt-auto">
          <Input
            type="text"
            placeholder="Search anything..."
            className="bg-[#f3f3f3] w-full py-5 pl-4 pr-10 rounded-lg text-gray-700 focus:outline-none"
          />
          <Search
            size={20}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
          />
        </div>
      </div>
    </header>
  );
}
