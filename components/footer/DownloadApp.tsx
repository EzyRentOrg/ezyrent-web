import React from 'react';
import SocialIcon from '../SocialIcon';
import AppLogo from './AppLogo';

export default function DownloadApp() {
  return (
    <div className="max-w-[198px] mx-auto md:mx-0 flex flex-col md:space-y-4">
      <p className="capitalize text-xl text-center md:text-left font-[500]">
        download app
      </p>
      <AppLogo />
      <SocialIcon />
    </div>
  );
}
