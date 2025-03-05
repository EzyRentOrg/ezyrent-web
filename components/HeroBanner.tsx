'use client';

import { cn } from '@/lib/utils';
import React, { ReactNode, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface HeroBannerProps {
  icon?: ReactNode;
  text: string;
  type: string;
  className?: string;
}

export default function HeroBanner({
  icon,
  text,
  type,
  className
}: HeroBannerProps) {
  const [isTextOpen, setIsTextOpen] = useState<boolean>(false);

  return (
    <div className={cn('flex flex-col space-y-2', className)}>
      <div className="flex items-center space-x-2 text-[#3a3838]">
        {icon}
        <span className="capitalize">{type}</span>
      </div>
      <div
        className="capitalize flex items-center space-x-2 cursor-pointer"
        onClick={() => setIsTextOpen(!isTextOpen)}
      >
        <p className="xl:text-2xl ">{text}</p>
        {isTextOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </div>
    </div>
  );
}
