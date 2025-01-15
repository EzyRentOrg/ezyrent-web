import { generateMetadata } from '@/lib/metadata';
import React from 'react';

export const metadata = generateMetadata({
  title: 'Property Management',
  description: 'Learn what it takes to manage a property',
  path: 'property-management'
});
export default function PropertyManagementLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="my-28">
      <div>{children}</div>
    </section>
  );
}
