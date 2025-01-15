import React from 'react';
import Link from 'next/link';
import MaxWidthWrapper from './maxWidthWrapper';
import { Home} from 'lucide-react';

export default function NotFound() {
  return (
    <div className="pt-28 pb-10">
      <MaxWidthWrapper>
        <main className="flex flex-col items-center justify-center space-y-8 text-center">
          {/* 404 Text */}
          <h1 className="text-8xl font-bold text-[#7065F0]">404</h1>

          {/* Main Content */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-gray-900">Page Not Found</h2>
            <p className="text-lg text-gray-600">
              Sorry, we couldn&apos;t find the page you&apos;re looking for.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="/"
              className="flex items-center justify-center gap-2 rounded-lg bg-[#7065F0] px-6 py-3 text-white transition-colors hover:bg-[#7065F0]/80"
            >
              <Home className="h-5 w-5" />
              Return Home
            </Link>
            {/* <button
              className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-3 text-gray-700 transition-colors hover:bg-gray-50"
            >
              <Search className="h-5 w-5" />
              Search Site
            </button> */}
          </div>

          {/* Illustration */}
          {/* <div className="relative mt-8">
            <div className="absolute -inset-4 rounded-full bg-blue-100/50 blur-lg"></div>
            <Search className="relative h-24 w-24 text-blue-600/40" />
          </div> */}
        </main>
      </MaxWidthWrapper>
    </div>
  );
}