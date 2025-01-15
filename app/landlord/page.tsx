import React from 'react';
import MaxWidthWrapper from '@/app/maxWidthWrapper';
import { FileText, Book, Calculator, Users } from 'lucide-react';
import Breadcrumb from '@/components/breadcrumb';

export default function LandlordResources() {
  return (
    <section className="my-28">
      <MaxWidthWrapper>
        <Breadcrumb />
        <main className="mt-10 flex flex-col items-center justify-center space-y-12 text-center">
          {/* Icon */}
          <div className="relative">
            <div className="absolute -inset-1 rounded-full bg-[#7065F0]/20 blur-lg"></div>
            <Book className="relative h-24 w-24 text-[#7065F0] md:h-32 md:w-32" />
          </div>

          {/* Main Content */}
          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-gray-900 md:text-5xl">
              Landlord Resources Hub
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              We&apos;re building a comprehensive resource center to help
              landlords manage their properties more effectively. Get access to
              tools, guides, and expert advice.
            </p>
          </div>

          {/* Upcoming Features */}
          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl bg-white p-6 shadow-lg transition-transform hover:scale-105">
              <FileText className="mb-4 h-8 w-8 text-[#7065F0]" />
              <h3 className="mb-2 text-xl font-semibold">Document Templates</h3>
              <p className="text-gray-600">
                Access legal templates, lease agreements, and essential forms
              </p>
            </div>
            <div className="rounded-xl bg-white p-6 shadow-lg transition-transform hover:scale-105">
              <Calculator className="mb-4 h-8 w-8 text-[#7065F0]" />
              <h3 className="mb-2 text-xl font-semibold">ROI Calculator</h3>
              <p className="text-gray-600">
                Tools to calculate property returns and analyze investments
              </p>
            </div>
            <div className="rounded-xl bg-white p-6 shadow-lg transition-transform hover:scale-105">
              <Users className="mb-4 h-8 w-8 text-[#7065F0]" />
              <h3 className="mb-2 text-xl font-semibold">Expert Network</h3>
              <p className="text-gray-600">
                Connect with property management experts and fellow landlords
              </p>
            </div>
          </div>
        </main>
      </MaxWidthWrapper>
    </section>
  );
}
