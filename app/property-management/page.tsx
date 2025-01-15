import React from 'react';
import MaxWidthWrapper from '../maxWidthWrapper';
import { Home, Mail, Clock } from 'lucide-react';
import Breadcrumb from '@/components/breadcrumb';

export default function PropertyManagement() {
  return (
    <section>
      <MaxWidthWrapper>
        <Breadcrumb />
        <main className="mt-10 flex flex-col items-center justify-center space-y-8 text-center">
          {/* House Icon */}
          <div className="relative">
            <div className="absolute -inset-1 rounded-full bg-[#7065F0]/20 blur-lg"></div>
            <Home className="relative h-24 w-24 text-[#7065F0] md:h-32 md:w-32" />
          </div>

          {/* Text Content */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-gray-900 md:text-5xl lg:text-6xl">
              Coming Soon
            </h1>
            <p className="mx-auto max-w-2xl text-sm text-gray-600 md:text-xl">
              We&apos;re building something amazing for your property management
              needs. Stay tuned for updates!
            </p>
          </div>

          {/* Features Preview */}
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl bg-white p-6 shadow-lg transition-transform hover:scale-105">
              <Home className="mb-4 h-8 w-8 text-[#7065F0]" />
              <h3 className="mb-2 text-xl font-semibold">Smart Management</h3>
              <p className="text-gray-600">
                Efficiently manage your properties with our innovative solutions
              </p>
            </div>
            <div className="rounded-xl bg-white p-6 shadow-lg transition-transform hover:scale-105">
              <Mail className="mb-4 h-8 w-8 text-[#7065F0]" />
              <h3 className="mb-2 text-xl font-semibold">Easy Communication</h3>
              <p className="text-gray-600">
                Seamless communication between property managers and tenants
              </p>
            </div>
            <div className="rounded-xl bg-white p-6 shadow-lg transition-transform hover:scale-105">
              <Clock className="mb-4 h-8 w-8 text-[#7065F0]" />
              <h3 className="mb-2 text-xl font-semibold">24/7 Support</h3>
              <p className="text-gray-600">
                Round-the-clock assistance for all your property needs
              </p>
            </div>
          </div>
        </main>
      </MaxWidthWrapper>
    </section>
  );
}
