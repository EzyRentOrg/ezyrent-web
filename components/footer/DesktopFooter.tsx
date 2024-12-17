import React from 'react';
import FooterQuickLinks from './FooterQuickLinks';
import Contact from './Contact';
import Support from './Support';
import DownloadApp from './DownloadApp';
import Image from 'next/image';

export default function DesktopFooter() {
  return (
    <div className="hidden h-auto lg:flex items-start justify-between text-[#344054] leading-[22.4px] ">
      <div className="w-[311px] h-[96px] ">
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
