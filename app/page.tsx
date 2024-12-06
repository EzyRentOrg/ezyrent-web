'use client';

import AboutUs from '@/components/AboutUs';
import BasedOnYourLocation from '@/components/BasedOnYourLocation';
import DesktopHeroView from '@/components/hero-page/DesktopHeroView';
import MobileHeroView from '@/components/hero-page/MobileHeroView';
import Testimonial from '@/components/testimonial/Testimonial';
import StartYourJourney from '@/components/StartYourJourney';

export default function Home() {
  return (
    <div>
      <div>
        <DesktopHeroView />
        <MobileHeroView />
      </div>
      <AboutUs />
      <BasedOnYourLocation />
      <Testimonial />
      <StartYourJourney />
    </div>
  );
}
