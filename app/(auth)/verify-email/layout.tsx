import { generateMetadata } from '@/lib/metadata';
import React from 'react';

export const metadata = generateMetadata({
  title: 'Email verification',
  description: 'Verify your email to enjoy a lot of unique features',
  path: 'verify-email'
});
export default function VerifyEmailLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <section className="">{children}</section>;
}
