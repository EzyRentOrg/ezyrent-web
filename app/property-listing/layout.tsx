import { generateMetadata } from '@/lib/metadata';
import React from 'react';

export const metadata = generateMetadata({
  title: 'Product Listing',
  description: 'List a property',
  path: 'property-listing'
});
export default function PropertyListingLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="mt-28 mb-10">
      <div>{children}</div>
    </section>
  );
}
