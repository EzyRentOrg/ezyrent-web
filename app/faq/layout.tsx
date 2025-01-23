import { generateMetadata } from '@/lib/metadata';
import React from 'react';

export const metadata = generateMetadata({
  title: 'FAQs',
  description: 'Some questions you might have are already answered',
  path: 'faq'
});
export default function PrivacyProlicyLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <section className="mt-28">{children}</section>;
}
