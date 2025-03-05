import React from 'react';
import FooterQuickLinks from './footer-components/FooterQuickLinks';
import Contact from './footer-components/Contact';
import Support from './footer-components/Support';
import DownloadApp from './footer-components/DownloadApp';
import Image from 'next/image';

export default function DesktopFooter() {
  return (
    <div className="hidden h-auto lg:flex items-start space-x-5 text-[#344054] leading-[22.4px] ">
      <div className="w-[320px] h-[96px] ">
        <Image
          src={'/logo/eazyRentBigLogo.png'}
          width={311}
          height={96}
          alt={'EazyRent Big Logo'}
          className="object-cover h-full w-full"
        />
      </div>
      <FooterQuickLinks />
      <Support />
      <Contact />
      <DownloadApp />
    </div>
  );
}
