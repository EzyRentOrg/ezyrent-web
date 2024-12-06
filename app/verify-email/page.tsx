'use client';

import { Suspense } from 'react';
import MaxWidthWrapper from '../maxWidthWrapper';
import MultiStepForm from './MultiStepForm';

export default function VerifyEmail() {
  return (
    <div className="py-16 mt-4">
      <MaxWidthWrapper className="flex justify-center items-center">
        <Suspense fallback={<div>loading...</div>}>
          <MultiStepForm />
        </Suspense>
      </MaxWidthWrapper>
    </div>
  );
}
