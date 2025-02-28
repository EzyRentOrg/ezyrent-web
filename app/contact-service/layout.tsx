import { generateMetadata } from '@/lib/metadata';
import React from 'react';

export const metadata = generateMetadata({
  title: 'Customer Services',
  description: 'contact us for any queries',
  path: 'contact-service'
});
export default function CareersLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="mt-20">
      <div>{children}</div>
    </section>
  );
}
