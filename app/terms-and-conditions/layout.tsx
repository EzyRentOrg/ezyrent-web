import { generateMetadata } from '@/lib/metadata';
import React from 'react';

export const metadata = generateMetadata({
  title: 'T&C',
  description: 'Terms and Conditions',
  path: 'terms-and-conditions'
});
export default function PrivacyProlicyLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <section className="my-28">{children}</section>;
}
