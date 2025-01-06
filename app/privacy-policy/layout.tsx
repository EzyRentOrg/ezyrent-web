import { generateMetadata } from '@/lib/metadata';
import React from 'react';

export const metadata = generateMetadata({
  title: 'Privacy Policy',
  description: 'Read our Privacy Policy',
  path: 'privacy-poilcy'
});
export default function PrivacyProlicyLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <section className="my-28">{children}</section>;
}
