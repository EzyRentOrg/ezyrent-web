import { generateMetadata } from '@/lib/metadata';
import React from 'react';

export const metadata = generateMetadata({
  title: 'Buy',
  description: 'Search for properties that are for sale',
  path: 'buy'
});
export default function BuyLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="mt-28">
      <div>{children}</div>
    </section>
  );
}
