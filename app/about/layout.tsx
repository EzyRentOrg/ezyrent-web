import { generateMetadata } from '@/lib/metadata';
import React from 'react';

export const metadata = generateMetadata({
  title: 'About',
  description: 'Get to know who we are and what we stand for',
  path: 'about'
});
export default function PrivacyProlicyLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <section className="my-28">{children}</section>;
}
