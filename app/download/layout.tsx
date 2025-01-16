import { generateMetadata } from '@/lib/metadata';
import React from 'react';

export const metadata = generateMetadata({
  title: 'Download',
  description: 'download from playstore or apple store',
  path: 'downlaod'
});
export default function DownloadLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <section className="my-28">{children}</section>;
}
