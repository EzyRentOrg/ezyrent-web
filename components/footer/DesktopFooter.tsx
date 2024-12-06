import React from 'react';
import NewsletterForm from './NewsletterForm';
import FooterQuickLinks from './FooterQuickLinks';
import Contact from './Contact';
import Support from './Support';
import DownloadApp from './DownloadApp';
import ClientLayout from '@/app/clientLayout';

export default function DesktopFooter() {
  return (
    <ClientLayout className="hidden md:grid md:grid-cols-2 lg:grid-cols-5 2xl:grid-cols-4 gap-20 lg:gap-14 text-white pt-28 pb-14">
      <NewsletterForm />
      <Contact />
      <FooterQuickLinks />
      <Support />
      <DownloadApp />
    </ClientLayout>
  );
}
