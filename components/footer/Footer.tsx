import React from 'react';
import DesktopFooter from './DesktopFooter';
import MobileFooter from './MobileFooter';
import NewsletterForm from './NewsletterForm';
import MaxWidthWrapper from '@/app/maxWidthWrapper';
import { Separator } from '../ui/separator';

export default function Footer() {
  const currentYear = new Date().getFullYear(); 
  return (
    <footer className="py-14 w-full bg-[#FAFAFAFA]">
      <MaxWidthWrapper>
        <NewsletterForm />
        <Separator className="bg-[#98A2B3] w-full my-10" />
        <DesktopFooter />
        <MobileFooter />
        <Separator className="bg-[#98A2B3] w-full my-10" />
        {/* copyright year will be like this 2024 - 2025. dynamic year */}
        <div className="flex items-center justify-center">
          <small className="text-[#344054]">
            &copy; Copyright EzyRent 2024
            {currentYear !== 2024 && ` -  ${currentYear}`}. All right reserved
          </small>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
}
