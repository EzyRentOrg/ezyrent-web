import { generateMetadata } from '@/lib/metadata';
import React from 'react';


export const metadata = generateMetadata({
  title: "Product Details",
  description: "Details of the house",
  path: "about"
});
export default function ProductDetailsLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <section className="my-28">{children}</section>;
}
