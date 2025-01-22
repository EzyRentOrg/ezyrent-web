import { generateMetadata } from '@/lib/metadata';
import React from 'react';

export const metadata = generateMetadata({
  title: 'Create Listing',
  description: 'Upload your houses',
  path: '/admin/property-management/create-listing'
});
export default function CreateListingLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <section className="">{children}</section>;
}
