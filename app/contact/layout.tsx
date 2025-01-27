import { generateMetadata } from '@/lib/metadata';
import React from 'react';

export const metadata = generateMetadata({
  title: 'Contact',
  description: 'Want to send us a message',
  path: 'contact'
});
export default function ContactLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <section className="flex-1 py-20 bg-neutral-100">{children}</section>;
}
