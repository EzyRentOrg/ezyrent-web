import React from 'react';
import NewsletterForm from './NewsletterForm';
import Contact from './Contact';
import FooterQuickLinks from './FooterQuickLinks';
import Support from './Support';
import DownloadApp from './DownloadApp';

export default function MobileFooter() {
  return (
    <div className="md:hidden">
      <div className="text-white pt-16 pb-14 grid gap-5">
        <NewsletterForm />
        <Contact />
        <div className="flex justify-between">
          <FooterQuickLinks />
          <Support />
        </div>
        <DownloadApp />
      </div>
    </div>
  );
}
