'use client';

import React, { useState } from 'react';
import Sidebar from '../Sidebar';
import AdminHeader from '../../components/AdminHeader';
import ClientCheckForToken from '../CheckForToken';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
  btnTitle?: string;
  handleClick?: () => void;
  sidebarProps?: {
    onSidebarHoverChange?: (isHovered: boolean) => void;
  };
}

export default function DashboardLayout({
  children,
  title,
  btnTitle,
  handleClick,
  sidebarProps
}: DashboardLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <main className="flex">
      {/* check session */}
      <ClientCheckForToken />
      {/* Sidebar */}
      <Sidebar
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        isMobileMenuOpen={isMobileMenuOpen}
        onSidebarHoverChange={sidebarProps?.onSidebarHoverChange}
      />
      {/* Contents */}
      <section className="w-full flex flex-col transition-all duration-300">
        <AdminHeader
          title={title}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          btnTitle={btnTitle}
          handleClick={handleClick}
        />
        <div className="w-full bg-neutral-50 flex-1 relative">{children}</div>
      </section>
    </main>
  );
}
