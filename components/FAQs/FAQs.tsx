import React, { useState } from 'react';
import FAQWrapper from './faq';
import { FAQsContent } from '@/config/FAQs';
import MaxWidthWrapper from '@/app/maxWidthWrapper';

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
    <section className="my-40">
      <MaxWidthWrapper>
        <h2 className="capitalize text-[#7065F0] font-semibold text-[2.1rem] md:text-5xl md:leading-[67.2px]">
          Frequently Asked Questions
        </h2>
        <p className="mt-1 mb-10 text-[1.25rem] md:text-[2rem] leading-[44.8px] text-[#4D4D4D]">
          Your questions, Answered
        </p>
        <div className="flex flex-col space-y-8">
          {FAQsContent.map((FAQ, index) => (
            <FAQWrapper
              index={FAQ.index}
              key={FAQ.question + index}
              question={FAQ.question}
              answer={FAQ.answer}
              isOpen={FAQ.index === openIndex}
              onClick={() => toggleFAQ(FAQ.index)}
            />
          ))}
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
