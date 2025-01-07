import Image from 'next/image';
import React from 'react';

//TODO: make the QR CODE WORK BASED ON PLAYSTORE OR APP STORE
export default function AppLogo() {
  return (
    <div className="grid grid-cols-2 gap-4 md:gap-2">
      <span className="text-center md:text-left col-span-2 text-[#FAFAFA] text-[0.7rem] leading-[18px] font-[500]">
        Save $3 with App New User Only
      </span>
      <div className="w-[80px] h-[80px]">
        <Image
          src={'/QrCode.svg'}
          alt="EzyRent QR Code."
          width={80}
          height={80}
          className="w-full h-full"
        />
      </div>
      <div className="flex flex-col space-y-2">
        <div className="w-[110px] h-[40px]">
          <Image
            src={'/google-play-store-logo.svg'}
            width={110}
            height={40}
            alt="playstore icon."
            className="w-full h-full"
          />
        </div>
        <div className="w-[110px] h-[40px] ">
          <Image
            src={'/appstore.svg'}
            width={110}
            height={40}
            alt="app store icon."
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}
