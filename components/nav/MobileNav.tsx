'use client';

import { navbarMenu, navbarMenuAuth } from '@/config/navMenu';
import { ChevronDown, ChevronUp, Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { Button } from '../ui/button';

export default function MobileNav() {
  const [toggleMobileMenu, setToggleMobileMenu] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  const handleToggleMobileMenu = () => {
    setToggleMobileMenu((prev) => !prev);
  };

  const handleDropdownToggle = (label: string) => {
    setOpenDropdown((prev) => (prev === label ? null : label));
  };

  return (
    <nav className="lg:hidden relative">
      <div className="mx-auto px-4 w-full flex items-center justify-between">
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/logo/LeftNav.png"
            alt="EzyRent logo"
            priority
            width={134}
            height={40}
            className="w-[134px] h-[40px]"
          />
        </Link>
        <div onClick={handleToggleMobileMenu}>
          {toggleMobileMenu ? <X /> : <Menu />}
        </div>
      </div>

      <div
        className={cn(
          'absolute top-full mt-4 left-0 w-full z-50 bg-white backdrop-blur-lg shadow-md transition-all duration-300 ease-in-out',
          toggleMobileMenu
            ? 'animate-pulldown opacity-100 visible'
            : 'opacity-0 invisible'
        )}
      >
        <div className="px-4 py-6">
          <ul className="flex flex-col items-center space-y-12">
            {navbarMenu.map((item, index) => (
              <div
                key={item.label + index}
                className="relative capitalize"
                onClick={() =>
                  item.dropdown && handleDropdownToggle(item.label)
                }
              >
                {item.dropdown ? (
                  <>
                    <div className="flex items-center space-x-2">
                      <span>{item.label}</span>
                      {openDropdown === item.label ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      )}
                    </div>
                    <ul
                      className={cn(
                        'mt-2 flex flex-col items-center space-y-2',
                        openDropdown === item.label ? 'block' : 'hidden'
                      )}
                    >
                      {item.dropdown.map((subItem, subIndex) => (
                        <li
                          key={subItem.label + subIndex}
                          onClick={() => setToggleMobileMenu(false)}
                          className={cn(
                            'block hover:text-[#7065F0] transition-colors mt-2',
                            pathname === subItem.href && 'text-[#7065F0]'
                          )}
                        >
                          <Link href={subItem.href}>{subItem.label}</Link>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    onClick={() => setToggleMobileMenu(false)}
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
          <div className="flex justify-center space-x-4 mt-12">
            {navbarMenuAuth.map((authItem, index) => (
              <Link key={authItem.label + index} href={authItem.href}>
                <Button
                  variant={authItem.label === 'sign up' ? 'default' : 'ghost'}
                  className={cn(
                    'w-full capitalize h-10 transition-colors',
                    authItem.label === 'sign up'
                      ? 'rounded-full bg-[#7065F0]'
                      : 'hover:text-[#7065F0]'
                  )}
                >
                  {authItem.label}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
