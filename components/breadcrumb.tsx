'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href: string;
  isActive: boolean;
}

export default function Breadcrumb() {
  const pathname = usePathname();
  const pathSegments = pathname
    .split('/')
    .filter((segment) => segment && isNaN(Number(segment)));

  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', href: '/', isActive: pathname === '/' },
    ...pathSegments.map((segment, index) => {
      const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
      return {
        label: decodeURIComponent(segment.replace(/-/g, ' ')),
        href,
        isActive: pathname === href
      };
    })
  ];

  return (
    <nav
      aria-label="Breadcrumb"
      className="w-full flex space-x-px text-sm text-gray-500"
    >
      {breadcrumbs.map((breadcrumb, index) => (
        <div key={breadcrumb.href} className="flex items-center capitalize">
          {index !== 0 && <span className="mx-2 text-gray-400">/</span>}
          {breadcrumb.isActive ? (
            <span className="text-gray-700 font-medium">
              {breadcrumb.label}
            </span>
          ) : (
            <Link
              href={breadcrumb.href}
              className="hover:text-gray-700 transition-colors"
            >
              {breadcrumb.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}
