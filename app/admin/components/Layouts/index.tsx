'use client';

import React, { useState } from 'react';
import Sidebar from '../Sidebar';
import AdminHeader from '../../components/AdminHeader';

export default function DashboardLayout({
  children,
  title,
  btnTitle,
  handleClick
}: {
  children: React.ReactNode;
  title?: string | undefined;
  btnTitle?: string;
  handleClick?: () => void;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <main className="flex min-h-screen">
      {/* Sidebar */}
      <div>
        <Sidebar
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          isMobileMenuOpen={isMobileMenuOpen}
        />
      </div>
      {/* Contents */}
      <section className="w-full flex flex-col">
        <AdminHeader
          title={title}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          btnTitle={btnTitle}
          handleClick={handleClick}
        />
        <div className="w-full bg-neutral-50">{children}</div>
      </section>
    </main>
  );
}
