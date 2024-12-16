import { NavbarMenuItem } from '@/types/navbarMenu';
import Link from 'next/link';
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface DropdownMenuProps {
  items: NavbarMenuItem[];
  label: string;
}

export default function DropdownMenu({ items, label }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className="flex items-center space-x-2 cursor-pointer"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <span className="capitalize font-[500] leading-6 text-[#000929]">
          {label}
        </span>
        <ChevronDown
          className={`w-4 h-4 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div className="fixed z-50 pt-8" onMouseEnter={() => setIsOpen(true)}>
        {isOpen && (
          <div className=" bg-white rounded-md shadow-lg w-max min-w-[200px]">
            <ul className="py-2">
              {items.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className="px-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center space-x-2 whitespace-nowrap"
                    onMouseEnter={() => setIsOpen(true)}
                    onMouseLeave={() => setIsOpen(false)}
                  >
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
