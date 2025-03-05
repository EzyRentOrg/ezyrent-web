import React from 'react';
import Contact from './footer-components/Contact';
import FooterQuickLinks from './footer-components/FooterQuickLinks';
import Support from './footer-components/Support';
import DownloadApp from './footer-components/DownloadApp';
import Image from 'next/image';

export default function MobileFooter() {
  return (
    <div className="lg:hidden">
      <div className="w-[311px] h-[96px] ">
        <Image
          src={'/logo/eazyRentBigLogo.png'}
          width={311}
          height={96}
          alt={'EazyRent Big Logo'}
          className="object-cover h-full w-full"
        />
      </div>
      <div className="pt-16 pb-14 flex items-start justify-between flex-wrap gap-8">
        <FooterQuickLinks />
        <Contact />
        <Support />
        <DownloadApp />
      </div>
    </div>
  );
}
