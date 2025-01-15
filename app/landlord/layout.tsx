import { generateMetadata } from '@/lib/metadata';
import React from 'react';

export const metadata = generateMetadata({
  title: 'Property Owners',
  description: 'Learn from experienced property owners',
  path: 'landlord'
});
export default function LandlordLayout({
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
