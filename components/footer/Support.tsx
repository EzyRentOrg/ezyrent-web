import { NavbarMenuItem } from '@/types/navbarMenu';
import Link from 'next/link';
import React from 'react';

interface SupportItem extends NavbarMenuItem {
  label: string;
  href: string;
}

const supportItems: SupportItem[] = [
  { label: 'Careers', href: '/' },
  { label: "FAQ's", href: '/FAQ' },
  { label: 'Privacy Policy', href: '#' }
];

export default function Support() {
  return (
    <div className="w-fit flex flex-col space-y-4">
      <p className="capitalize text-xl font-[500]">support</p>
      <div className="flex flex-col space-y-4">
        {supportItems.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className=" text-[#475467] hover:text-opacity-65 transition-colors duration-150 ease-in-out"
          >
            <p>{link.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
