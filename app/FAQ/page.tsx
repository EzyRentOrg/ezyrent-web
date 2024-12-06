import React from 'react';
import ClientLayout from '../clientLayout';

export default function FAQ() {
  return (
    <ClientLayout className="flex-grow  min-h-calc(100vh-200px)] ">
      <div className="flex flex-col">
        <div className="flex flex-col space-y-4">
          <p className="text-[#7065F0] text-5xl font-semibold leading-10">
            Frequently Asked Questions
          </p>
          <span className="text-[#4D4D4D] text-3xl leading-8 font-normal">
            Need answers? We got them.
          </span>
        </div>
        {/* Add your FAQ content here */}
      </div>
    </ClientLayout>
  );
}
