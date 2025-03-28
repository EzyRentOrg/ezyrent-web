import { generateMetadata } from '@/lib/metadata';
import React from 'react';
import Header from '@/components/nav/Header';
import Footer from '@/components/footer/Footer';

export const metadata = generateMetadata({
  title: 'About',
  description: 'Get to know who we are and what we stand for',
  path: 'about'
});
export default function AboutLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="mt-28">
      <Header />
      {children}
      <Footer />
    </section>
  );
}
