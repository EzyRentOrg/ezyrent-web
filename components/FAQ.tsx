import React from 'react';
import FAQWrapper from './ui/faq';
import { FAQsContent } from '@/config/FAQs';
import MaxWidthWrapper from '@/app/maxWidthWrapper';

export default function FAQ() {
  return (
    <section className="my-40">
      <MaxWidthWrapper>
        <h2 className="text-[1.9rem] md:text-[3rem] text-center md:leading-[67.2px] font-semibold text-[#7065f0]">
          Frequently Asked Questions
        </h2>
        <p className="mt-1 mb-10 text-[1.25rem] md:text-[2rem] text-center leading-[44.8px] text-[#4D4D4D]">
          Your questions, Answered
        </p>
        <div className="flex flex-col space-y-8">
          {FAQsContent.map((FAQ, index) => (
            <FAQWrapper
              key={FAQ.question + index}
              question={FAQ.question}
              answer={FAQ.answer}
            />
          ))}
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
