import { generateMetadata } from '@/lib/metadata';
import React from 'react';

export const metadata = generateMetadata({
  title: 'Careers',
  description: 'Come join us and make a remarkable change',
  path: 'careers'
});
export default function CareersLayout({
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
