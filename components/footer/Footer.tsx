import React from 'react';
import DesktopFooter from './DesktopFooter';
import MobileFooter from './MobileFooter';

export default function Footer() {
  return (
    <footer className="footer self-end bg-[#000929]">
      <DesktopFooter />
      <MobileFooter />
    </footer>
  );
}
