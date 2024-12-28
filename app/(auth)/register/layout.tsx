import { generateMetadata } from '@/lib/metadata';
import React from 'react';

export const metadata = generateMetadata({
  title: 'Register',
  description: 'Register to enjoy a lot of unique features',
  path: 'register'
});
export default function RegisterLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <section className="">{children}</section>;
}
