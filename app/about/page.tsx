import React from 'react';
import Breadcrumb from '@/components/breadcrumb';
import { serviceFeatures } from '@/config/about';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import ServiceCard from '@/components/about/service-card';

export default function About() {
  return (
    <section className='max-w-[1440px] mx-auto px-5 md:px-10 lg:px-20 flex-1'>
      <div className="pl-5">
        <Breadcrumb />
      </div>
     
      <main className='flex-1 flex flex-col items-center justify-center space-y-12 mt-10 text-center'>
        {/* Hero Section */}
        <header 
          className="mt-5 relative w-full max-w-[1240px] mx-auto h-[400px] md:h-[500px] lg:rounded-[40px] bg-[url('/about/about-image2479x1653.jpeg')] bg-no-repeat bg-center bg-cover overflow-hidden"
          aria-label="EzyRent About Page Hero"
        >
          <div className="absolute inset-0 bg-[#000929] bg-opacity-75 flex flex-col justify-center items-center text-white text-center h-full">
            <div className="max-w-[900px] mx-auto flex flex-col items-center justify-center h-full px-4">
              <h1 className="mb-10 text-[1.5rem] sm:text-[2rem] md:text-[3rem] lg:text-[3.5rem] font-semibold !leading-[1.4]">
                Transforming Rentals, <br />
                One Listing at a Time
              </h1>
              <p className="text-xs md:text-xl lg:text-[1.5rem] mt-2 font-light italic !leading-[1.5]">
                <span className="font-extrabold text-white">
                  EzyRent
                </span>{' '}
                is revolutionizing property rentals across Nigeria and Africa.
                Making it seamless to find, rent or sell homes from anywhere in
                the world. With a user-first approach, we eliminate agent fees
                and bring transparency, convenience, and security to the rental process.
              </p>
            </div>
          </div>
        </header>

        {/* Mission Section */}
        <section className="py-10 lg:py-20 max-w-[900px] mx-auto">
          <h2 className="lg:mb-10 text-2xl md:text-3xl lg:text-[2.5rem] font-medium text-[#7065F0] text-center">
            Our Mission
          </h2>
          <p className="max-w-[800px] mx-auto mt-2 lg:mt-4 text-gray-600 text-[1rem] lg:text-[1.1rem] leading-relaxed">
            At <span className="font-extrabold">EzyRent</span>, our mission is
            to revolutionize the property rental experience by creating a
            seamless and trusted platform that bridges the gap between renters,
            landlords, and property managers. We empower renters with broader,
            reliable housing options and easy access to secure, affordable
            homes. We support landlords by providing them with an extensive pool
            of verified tenants and tools to manage their properties
            efficiently.
          </p>
        </section>

        {/* What We Offer Section */}
        <section className="py-10 w-full">
          <h2 className="text-2xl md:text-3xl lg:text-[2.5rem] font-medium text-[#7065F0] text-center">
            What We Offer
          </h2>

          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 place-items-center mx-auto w-[90%]">
            {serviceFeatures.map((service, index) => (
              <ServiceCard 
                key={service.title} 
                title={service.title} 
                text={service.description} 
                iconName={service.icon} 
                index={index + 1} 
              />
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <div className="text-center">
          <p className="max-w-[632px] mx-auto text-2xl md:text-[2.5rem] font-semibold leading-tight text-[#000929]">
            Let’s Start Your Real Estate Journey Today
          </p>
          <div className="flex items-center justify-center w-full my-10">
            <Link href="/contact">
              <Button variant="default" className="h-[64px] md:h-[72px] text-lg md:text-xl bg-[#000929]">
                Send us a Message <ArrowRight size={28} className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </section>
  );
}
