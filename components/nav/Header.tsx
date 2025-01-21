import React from 'react';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';

export default function Header() {
  return (
    <div className=" max-w-[1240px] w-[98%] lg:rounded-full mx-auto fixed top-0 right-0 left-0 bg-white/70 z-[9999] backdrop-blur-md shadow-md shadow-black/5 transition-all duration-300 ease-in-out py-5">
      <DesktopNav />
      <MobileNav />
    </div>
  );
}
