import { cn } from '@/lib/utils';
import React from 'react';
import Header from '@/components/nav/Header';
import Footer from '@/components/footer/Footer';

export default function MaxWidthWrapper({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <main className="flex-1 flex flex-col h-auto">
      <Header />
      <div
        className={cn(
          'w-full max-w-[1440px] mx-auto px-5 md:px-10  flex-1',
          className
        )}
      >
        {children}
      </div>
      <Footer />
    </main>
  );
}
