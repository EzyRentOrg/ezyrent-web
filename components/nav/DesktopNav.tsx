'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import MaxWidthWrapper from '@/app/maxWidthWrapper';
import { navbarMenu, navbarMenuAuth } from '@/config/navMenu';
import Image from 'next/image';
import Link from 'next/link';
import DropdownMenu from '../DropdownMenu';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils/cn';
import { Menu } from 'lucide-react';

export default function DesktopNav() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-[50] bg-white/80 backdrop-blur-md shadow-md transition-all duration-300 ease-in-out py-5">
      <div className="max-w-[1440px] mx-auto px-2 md:px-8  w-full flex items-center">
        {/* Left Section: Logo and Navigation Links */}
        <div className="capitalize font-[500] leading-6 text-[#000929] w-full flex items-center space-x-12">
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

          {/* Menu Links */}
          <div className="hidden lg:flex items-center space-x-12">
            {(navbarMenu || []).map((item, index) => (
              <div key={item.label + index} className="relative">
                {item.dropdown ? (
                  <DropdownMenu items={item.dropdown} label={item.label} />
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      'hover:text-[#7065F0] transition-colors',
                      pathname === item.href && 'text-[#7065F0]'
                    )}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Section: Authentication Links and menu */}
        <div className="md:hidden flex items-center space-x-4">
          <Menu />
        </div>
        <div className="hidden w-[50%] md:w-[35%] lg:w-[30%] xl:w-[20%] md:flex items-center justify-between ml-auto">
          {(navbarMenuAuth || []).map((navbarAuth, index) => (
            <Link key={navbarAuth.label + index} href={navbarAuth.href}>
              <Button
                variant={navbarAuth.label === 'sign up' ? 'default' : 'outline'}
                className={cn(
                  'capitalize h-12 transition-colors',
                  navbarAuth.label &&
                    'border-[#7065F0] hover:bg-[#7065F0] hover:text-white'
                )}
              >
                {navbarAuth.label}
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
