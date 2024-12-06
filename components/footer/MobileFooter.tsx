import React from 'react';
import NewsletterForm from './NewsletterForm';
import Contact from './Contact';
import FooterQuickLinks from './FooterQuickLinks';
import Support from './Support';
import DownloadApp from './DownloadApp';
import ClientLayout from '@/app/clientLayout';

export default function MobileFooter() {
  return (
    <ClientLayout>
      <div className="md:hidden text-white pt-16 pb-14 grid gap-5">
        <NewsletterForm />
        <Contact />
        <div className="flex justify-between">
          <FooterQuickLinks />
          <Support />
        </div>
        <DownloadApp />
      </div>
    </ClientLayout>
  );
}
