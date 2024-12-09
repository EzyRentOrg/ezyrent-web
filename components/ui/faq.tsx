'use client';

import MaxWidthWrapper from '@/app/maxWidthWrapper';
import { ChevronDown, Link2 } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

export default function FAQWrapper({
  question,
  answer
}: {
  question: string;
  answer: string;
}) {
  const [isOpenAnswer, setIsOpenAnser] = useState<boolean>(false);
  return (
    <section>
      <div className=" mx-auto space-y-6">
        <div
          onClick={() => setIsOpenAnser(!isOpenAnswer)}
          className="space-y-5 bg-[#F5F5F5] rounded-[10px] py-3 px-2 cursor-pointer"
        >
          <div className="flex items-center ">
            {/* icon left */}
            <Link2 />
            <div className="flex w-full items-center justify-between rounded-md bg-muted px-4  text-left font-medium transition-colors hover:bg-muted/50 focus:outline-none focus-visible:ring focus-visible:ring-primary focus-visible:ring-opacity-75">
              <p className="text-[#000929] font-[500] text-[1.5rem]">
                {question}
              </p>
              <div
                onClick={() => setIsOpenAnser(!isOpenAnswer)}
                className="cursor-pointer"
              >
                {/* icon right */}
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
            <div className="pl-10 pr-4 pb-4 text-muted-foreground">
              <p className="text-[#808080] text-[1.25rem] font-normal">
                {answer}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
