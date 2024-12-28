'use client';

import { navbarMenu, navbarMenuAuth } from '@/config/navMenu';
import { Menu, X } from 'lucide-react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import DropdownMenu from '../DropdownMenu';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { Button } from '../ui/button';

export default function MobileNav() {
  const [toggleMobileMenu, setToggleMobileMenu] = useState(false);
  const pathname = usePathname();

  const handleToggleMobileMenu = () => {
    setToggleMobileMenu((prev) => !prev);
  };

  return (
    <>
      <Head>
        <link rel="preload" href="/logo/LeftNav.png" as="image" />
      </Head>
      <nav className="lg:hidden relative">
        <div className="mx-auto px-4 md:px- w-full flex items-center justify-between">
          {/* Left Section: Logo */}
          <div>
            <Link href="/" className="flex-shrink-0">
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
          {/* toggle menu Icon */}
          <div onClick={handleToggleMobileMenu}>
            {toggleMobileMenu ? <X /> : <Menu />}
          </div>
        </div>

        {/* Dropdown Menu */}
        <div
          className={cn(
            'absolute top-full left-0 w-full z-50 bg-white/70 backdrop-blur-lg shadow-md transition-all duration-300 ease-in-out',
            toggleMobileMenu
              ? 'animate-pulldown opacity-100 visible'
              : 'opacity-0 invisible'
          )}
        >
          <div className="px-4 py-6">
            <ul className="flex flex-col items-center space-y-12">
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
            </ul>
            <div className="flex justify-center space-x-4 mt-6">
              {(navbarMenuAuth || []).map((navbarAuth, index) => (
                <Link
                  key={navbarAuth.label + index}
                  href={navbarAuth.href}
                  className="w-full max-w-xs"
                >
                  <Button
                    variant={
                      navbarAuth.label === 'sign up' ? 'default' : 'ghost'
                    }
                    className={cn(
                      'w-full capitalize h-10 transition-colors',
                      navbarAuth.label === 'sign up'
                        ? 'rounded-full bg-[#7065F0]'
                        : 'hover:text-[#7065F0] transition-colors'
                    )}
                  >
                    {navbarAuth.label}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
