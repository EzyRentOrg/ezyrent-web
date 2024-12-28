import { generateMetadata } from '@/lib/metadata';
import React from 'react';

export const metadata = generateMetadata({
  title: 'Login',
  description: 'Welcome back to EzyRent',
  path: 'login'
});
export default function LoginLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <section className="">{children}</section>;
}
