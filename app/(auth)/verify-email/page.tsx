'use client';

import React, { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import RightHandAuthPage from '@/components/RightHandAuthPage';
import MaxWidthWrapper from '@/app/maxWidthWrapper';
import LappedImages from '@/components/LappedImages';
import VerificationOTP from './components/verificatioOTP';

// Main component
export default function VerifyEmail() {
  return (
    <MaxWidthWrapper className="w-full px-0">
      <section className="min-h-[984px] mx-auto mb-10 flex items-center lg:space-x-10">
        <main className="h-[964px] w-full flex flex-col">
          <div className="bg-[#F8F8F8] h-full mb-10 rounded-[20px] flex flex-col items-center justify-center w-full">
            <Suspense
              fallback={
                <div className="flex justify-center items-center h-full">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
              }
            >
              <VerificationOTP />
            </Suspense>
          </div>
          <LappedImages />
        </main>
        <RightHandAuthPage />
      </section>
    </MaxWidthWrapper>
  );
}
