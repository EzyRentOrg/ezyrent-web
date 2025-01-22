import { generateMetadata } from '@/lib/metadata';
import React from 'react';

export const metadata = generateMetadata({
  title: 'All Listing',
  description: 'Manage your listing',
  path: '/admin/property-management'
});
export default function PropertyManagementLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <section className="">{children}</section>;
}
