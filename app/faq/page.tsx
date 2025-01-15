'use client';

import React, { useState } from 'react';
import MaxWidthWrapper from '../maxWidthWrapper';
import Breadcrumb from '@/components/breadcrumb';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import FAQWrapper from '@/components/FAQs/faq';
import { FAQFullData } from '@/config/FAQs';
import { Separator } from '@/components/ui/separator';

export default function FAQ() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  // Filter FAQ based on the search query
  const filteredFAQs = FAQFullData.filter(
    (FAQ) =>
      FAQ.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      FAQ.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <section>
      <MaxWidthWrapper>
        <Breadcrumb />
        <main>
          <div className="flex flex-col items-center space-y-10 mt-5 max-w-[720px] mx-auto">
            <div className="flex flex-col items-center">
              <h1 className="text-[#7065F0] font-semibold md:text-[1.5rem] lg:text-[2rem] leading-[57.2px] capitalize">
                Frequently Asked Questions
              </h1>
              <p className="text-[1.2rem] ">Your questions, Answered</p>
            </div>
            {/* search */}
            <div className="relative w-full max-w-[520px]">
              <Input
                type="text"
                placeholder="When is the best period to rent a house in Abuja?"
                className="bg-[#fff] h-16 w-full pl-4 pr-10 rounded-lg text-gray-700 focus:outline-none placeholder:text-base"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-5">
                <Separator
                  orientation={'vertical'}
                  className="h-6 bg-[#E6E6E6] w-[2px]"
                />
                <Search
                  size={30}
                  stroke={'#7065F0'}
                  className=" cursor-pointer"
                />
              </div>
            </div>
          </div>
          {/* faq data */}
          <div className="mt-20 flex flex-col space-y-12">
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map((FAQ, index) => (
                <FAQWrapper
                  key={FAQ.question + index}
                  index={FAQ.index}
                  question={FAQ.question}
                  answer={FAQ.answer}
                  isOpen={FAQ.index === openIndex}
                  onClick={() => toggleFAQ(FAQ.index)}
                />
              ))
            ) : (
              <p className="text-center text-gray-500">No results found.</p>
            )}
          </div>
        </main>
      </MaxWidthWrapper>
    </section>
  );
}
