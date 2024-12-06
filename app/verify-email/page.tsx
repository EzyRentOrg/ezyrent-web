'use client';

import { Suspense } from 'react';
import ClientLayout from '../clientLayout';
import MultiStepForm from './MultiStepForm';

export default function VerifyEmail() {
  return (
    <div className="py-16 mt-4">
      <ClientLayout className="flex justify-center items-center">
        <Suspense fallback={<div>loading...</div>}>
          <MultiStepForm />
        </Suspense>
      </ClientLayout>
    </div>
  );
}
