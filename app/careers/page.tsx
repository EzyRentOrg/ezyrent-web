import React from 'react';

import Breadcrumb from '@/components/breadcrumb'
import MaxWidthWrapper from '../maxWidthWrapper'
import { Briefcase, Clock } from 'lucide-react';

export default function Careers() {
  return (
    <section className="my-28">
      <MaxWidthWrapper>
        <Breadcrumb />



        <main className="mt-10 flex items-center justify-center text-white">
          <div className="text-center max-w-lg">
            <div className="mb-6">
              <Briefcase className="mx-auto h-16 w-16 text-[#7065F0]" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Careers Page Coming Soon</h1>
            <p className="text-lg text-gray-600 mb-6">
              We’re working hard to create exciting opportunities for talented individuals like you. Stay tuned!
            </p>
            <div className="flex items-center justify-center gap-2">
              <Clock className="h-5 w-5 text-[#7065F0]" />
              <span className="text-gray-500">Launching Soon</span>
            </div>
          </div>
        </main>
      </MaxWidthWrapper >
    </section>
  );
}
