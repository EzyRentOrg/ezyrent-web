import { generateMetadata } from '@/lib/metadata';
import React from 'react';

export const metadata = generateMetadata({
  title: 'Product Listing',
  description: 'List a property',
  path: 'property-listing'
});
export default function ProductListingLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <section className="my-28"><div>{children}</div></section>;
}
