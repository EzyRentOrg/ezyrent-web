import { NavbarMenuItem } from '@/types/navbarMenu';
import Link from 'next/link';
import React from 'react';

interface QuickLinkItem extends NavbarMenuItem {
  label: string;
  href: string;
}

const quickLinks: QuickLinkItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Rent', href: '#' },
  { label: 'about', href: '#' }
];

export default function FooterQuickLinks() {
  return (
    <div className="w-[165px] flex flex-col space-y-4">
      <p className="capitalize text-xl font-[500]">quick links</p>
      <div className="flex flex-col space-y-4">
        {quickLinks.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className="w-fit capitalize text-[#E6E6E6] hover:text-opacity-65 transition-colors duration-150 ease-in-out"
          >
            <p>{link.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
