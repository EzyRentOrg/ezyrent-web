import { cn } from '@/lib/utils/cn';
import React from 'react';

export default function ClientLayout({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'max-w-[1440px] w-full mx-auto px-2 md:px-8 overflow-x-hidden',
        className
      )}
    >
      {children}
    </div>
  );
}
