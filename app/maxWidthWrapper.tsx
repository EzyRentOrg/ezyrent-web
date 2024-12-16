import { cn } from '@/lib/utils';
import React from 'react';

export default function MaxWidthWrapper({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'max-w-[1440px] mx-auto px-2 md:px-10 flex-1',
        className
      )}
    >
      {children}
    </div>
  );
}
