import { Menu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function MobileNav() {
  return (
    <nav className="lg:hidden rounded-full mx-auto fixed top-0 right-0 left-0 bg-white/70 z-[50] backdrop-blur-md shadow-md transition-all duration-300 ease-in-out py-5">
      <div className=" mx-auto px-8  w-full flex items-center justify-between">
        {/* Left Section: Logo and Navigation Links */}
        <div className="">
          {/* Logo */}
          <Link href={'/'} className="flex-shrink-0">
            <Image
              src={'/logo/LeftNav.png'}
              alt="EzyRent logo"
              priority={true}
              width={134}
              height={40}
              className="w-[134px] h-[40px]"
            />
          </Link>
        </div>
        <Menu />
      </div>
    </nav>
  );
}
