'use client';

import React from 'react';
import ClientLayout from '@/app/clientLayout';
import { navbarMenu, navbarMenuAuth } from '@/config/navMenu';
import Image from 'next/image';
import Link from 'next/link';
import DropdownMenu from '../DropdownMenu';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils/cn';

export default function DesktopNav() {
  return (
    <nav className="h-[96px] w-full grid items-center z-[10] shadow-md transition-all duration-300 ease-in-out fixed backdrop-blur-2xl">
      <ClientLayout className="w-full flex items-center">
        <div className="capitalize font-[500] leading-6 text-[#000929] w-full  flex items-center space-x-12">
          <Link href={'/'} className="">
            <Image
              src={'/logo/LeftNav.png'}
              alt="EzyRent logo"
              priority={true}
              width={134}
              height={40}
              className="w-[134px] h-[40px]"
            />
          </Link>
          {/* menu links */}
          <div className="hidden lg:flex items-center space-x-12">
            {navbarMenu.map((item, index) => (
              <div key={item.label + index} className="relative">
                {item.dropdown ? (
                  <DropdownMenu items={item.dropdown} label={item.label} />
                ) : (
                  <Link href={item.href}>{item.label}</Link>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Auth links */}
        <div className="hidden w-[50%] md:w-[35%] lg:w-[30%] xl:w-[20%] md:flex items-center justify-between ml-auto">
          {navbarMenuAuth.map((navbarAuth, index) => (
            <Link key={navbarAuth.label + index} href={navbarAuth.href}>
              <Button
                variant={navbarAuth.label === 'sign up' ? 'default' : 'outline'}
                className={cn(
                  'capitalize h-12',
                  navbarAuth.label && 'border-[#7065F0]'
                )}
              >
                {navbarAuth.label}
              </Button>
            </Link>
          ))}
        </div>
      </ClientLayout>
    </nav>
  );
}
