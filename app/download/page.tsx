

import Link from 'next/link';
import { PlayCircle, Apple } from 'lucide-react';
import React from 'react';
import MaxWidthWrapper from '../maxWidthWrapper';
import Breadcrumb from '@/components/breadcrumb';

const DownloadButton = ({
  href,
  icon: Icon,
  children
}: {
  href: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) => (
  <Link
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center justify-center w-full py-3 px-4 bg-[#f1f1f1] hover:bg-gray-200 text-[#000929] rounded-lg transition duration-300 ease-in-out"
  >
    <Icon className="w-6 h-6 mr-2" />
    {children}
  </Link>
);

export default function DownloadPage() {
  return (
    <section>
      <MaxWidthWrapper className=" flex flex-col gap-10">
        <Breadcrumb  />
        <main className=" flex items-center justify-center bg-white p-4">
          <div className="bg-[#7065F0] rounded-lg shadow-xl p-8 max-w-xl  w-full">
            <h1 className="text-2xl font-bold text-center mb-2">
              Download Our App
            </h1>
            <p className="text-[#f1f1f1] text-center mb-6">
              Get the best experience on your mobile device
            </p>
            <div className="space-y-4 md:px-12">
              <DownloadButton
                href="https://play.google.com/store/apps/details?id=your.app.id"
                icon={PlayCircle}
              >
                Download on Google Play
              </DownloadButton>
              <DownloadButton
                href="https://apps.apple.com/us/app/your-app-name/idYOUR_APP_ID"
                icon={Apple}
              >
                Download on the Apple Store
              </DownloadButton>
            </div>
          </div>
        </main>
      </MaxWidthWrapper>
    </section>
  );
}
