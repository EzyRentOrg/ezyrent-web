import React from 'react';

export default function AdminLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="!min-w-full overflow-hidden ">
      <div className="min-w-full overflow-x-hidden">{children}</div>
    </section>
  );
}
