'use client';

import React, { useEffect, useState } from 'react';
import AboutUs from '@/components/AboutUs';
import BasedOnYourLocation from '@/components/BasedOnYourLocation';
import Testimonial from '@/components/testimonial/Testimonial';
import OfferSection from '@/components/OfferSection';
import BestDeal from '@/components/BestDeal';
import FAQs from '@/components/FAQs/FAQs';
import HeroPage from '@/components/hero-page/HeroPage';
import Header from '@/components/nav/Header';
import Footer from '@/components/footer/Footer';
import GetStarted from '@/components/GetStarted';
import AboutUsCarousel from '@/components/carousel/about-us-carousel';
import StartYourJourney from '@/components/StartYourJourney';
import AboutUsVideo from '@/components/AboutUsVideo';

interface Location {
  latitude: number;
  longitude: number;
}

export default function Home() {
  const [location, setLocation] = useState<Location | null>(null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        if (!response.ok) {
          throw new Error('Failed to fetch location data');
        }
        const data = await response.json();
        setLocation({
          latitude: data.latitude,
          longitude: data.longitude
        });
      } catch (error) {
        console.error('Error fetching location:', error);
      }
    };

    fetchLocation();
  }, []);
  return (
    <div>
      <Header />
      <div>
        <HeroPage />
      </div>
      <AboutUs />
      <BasedOnYourLocation location={location} />
      <BestDeal />
      <AboutUsVideo />
      <OfferSection />
      <Testimonial />
      <FAQs />
      <AboutUsCarousel />
      <GetStarted />
      <StartYourJourney />

      {/* <StartYourJourney /> */}
      <Footer />
    </div>
  );
}
