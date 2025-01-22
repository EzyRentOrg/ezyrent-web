import React from 'react';
import Sidebar from '../Sidebar';

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen">
      {/* Sidebar */}
      <div>
        <Sidebar />
      </div>
      {/* Contents */}
      <section className="flex-1 flex flex-col">
        <div className="flex-1 bg-neutral-50">{children}</div>
      </section>
    </main>
  );
}
