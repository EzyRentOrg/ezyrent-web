import React from 'react';
import DesktopFooter from './DesktopFooter';
import MobileFooter from './MobileFooter';

export default function Footer() {
  return (
    <footer className="w-full mt-auto bg-[#000929]">
      <DesktopFooter />
      <MobileFooter />
    </footer>
  );
}
