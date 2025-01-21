import React from 'react';
import DesktopFooter from './DesktopFooter';
import MobileFooter from './MobileFooter';
import { Separator } from '../ui/separator';
import NewsletterForm from './footer-components/NewsletterForm';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="w-full mt-auto flex-1 py-14 bg-[#FAFAFAFA]">
    <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-20">
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
        </div>
    </footer>
  );
}
