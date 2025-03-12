import React from 'react';
import Breadcrumb from '@/components/breadcrumb';
import MaxWidthWrapper from '../maxWidthWrapper';
import { ArrowRight, Home } from 'lucide-react';
import Link from 'next/link';

export default function Buy() {
  return (
    <MaxWidthWrapper>
      <Breadcrumb />

      <main className="flex flex-col items-center justify-center space-y-12 mt-10 text-center">
        {/* Main Content */}
        <div className="relative">
          <div className="absolute -inset-1 rounded-full bg-[#7065F0]/20 blur-lg"></div>
          <Home className="relative h-20 w-20 text-[#7065F0] md:h-28 md:w-28" />
        </div>

        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-gray-900 md:text-5xl">
            Properties for Sale Coming Soon
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            While we&apos;re preparing our sales listings, you can explore our
            extensive collection of rental properties.
          </p>
        </div>

        {/* CTA Cards */}
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
          {/* Rentals Card */}
          <div className="rounded-xl bg-white p-8 shadow-lg transition-transform hover:scale-105">
            <h3 className="mb-3 text-2xl font-semibold text-gray-900">
              Browse Rentals
            </h3>
            <p className="mb-6 text-gray-600">
              Explore our current selection of properties available for rent.
            </p>
            <Link
              href={'/property-listing'}
              className=" w-fit flex items-center justify-center gap-2 rounded-lg bg-[#7065F0] px-6 py-3 text-white hover:bg-opacity-90 transition-colors duration-100 ease-in-out"
            >
              View Rental Listings
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </main>
    </MaxWidthWrapper>
  );
}
