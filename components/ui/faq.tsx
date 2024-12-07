'use client';

import { ChevronDown, Link2 } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

export default function FAQs({
  question,
  answer
}: {
  question: string;
  answer: string;
}) {
  const [isOpenAnswer, setIsOpenAnser] = useState<boolean>(false);
  return (
    <section className="container mx-auto py-12 px-4 md:px-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <div
          onClick={() => setIsOpenAnser(!isOpenAnswer)}
          className="space-y-5 bg-[#F5F5F5] rounded-[10px] py-3 px-2 cursor-pointer"
        >
          <div className="flex items-center ">
            <Link2 />
            <div className="flex w-full items-center justify-between rounded-md bg-muted px-4 py-3 text-left font-medium transition-colors hover:bg-muted/50 focus:outline-none focus-visible:ring focus-visible:ring-primary focus-visible:ring-opacity-75">
              {question}adfdg
              <div
                onClick={() => setIsOpenAnser(!isOpenAnswer)}
                className="cursor-pointer"
              >
                <Image
                  src={isOpenAnswer ? '/chevronOpen.png' : '/chevronClose.png'}
                  height={28}
                  width={28}
                  alt="chevron"
                />
              </div>
            </div>
          </div>
          {isOpenAnswer && (
            <div className="px-4 pb-4 text-muted-foreground">
              <p>{answer}asdfghgjhk</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
