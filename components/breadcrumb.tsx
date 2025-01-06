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

  // Split the path into segments, excluding empty and ID-like segments
  const pathSegments = pathname
    .split('/')
    .filter((segment) => segment && !/^\d+(\[.+\])?$/.test(segment)); // Exclude numeric or [id]-like segments

  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', href: '/', isActive: pathname === '/' },
    ...pathSegments.map((segment, index) => {
      const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
      return {
        label: decodeURIComponent(segment.replace(/-/g, ' ')),
        href,
        isActive: pathname.startsWith(href),
      };
    }),
  ];

  return (
    <nav
      aria-label="Breadcrumb"
      className="w-full flex space-x-px text-sm text-[#000929]"
    >
      {breadcrumbs.map((breadcrumb, index) => (
        <div key={breadcrumb.href} className="flex items-center capitalize">
          {index !== 0 && <span className="mx-2 text-gray-400">/</span>}
          {breadcrumb.isActive ? (
            <span className="text-[#000929] font-bold">
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
