import React from 'react';
import { securityTips } from '@/config';
import { CircleHelp } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';

export default function SecurityTips() {
  return (
    <section className="mt-[80px] py-10 rounded-[30px] max-w-[1035px] bg-[#FAFAFA] mx-auto w-full flex flex-col items-center justify-center">
      <h2 className="text-[1.2rem] md:text-[2rem] font-bold text-[#000929] lg:leading-[50.4px] capitalize flex items-center">
        Security Tips
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span>
                <CircleHelp
                  size={32}
                  stroke={'#E30000'}
                  strokeWidth={2}
                  className="ml-2 cursor-pointer"
                />
              </span>
            </TooltipTrigger>
            <TooltipContent className="md:w-[300px] text-sm">
              <p>
                <strong>Security Tips:</strong> These are guidelines to help you
                maintain safety, such as keeping doors locked, monitoring
                surveillance systems, and being cautious with personal
                information.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </h2>
      <ul className="list-disc">
        {securityTips.map((tip, index) => (
          <li
            key={`${tip.tip}-${index}`}
            className="text-[#000929] my-5 font-normal w-[200px] md:w-full"
          >
            <strong className="font-[400] text-sm md:txt-base lg:text-[1.25rem] lg:leading-[30px]">
              {tip.tip}
            </strong>
          </li>
        ))}
      </ul>
    </section>
  );
}
