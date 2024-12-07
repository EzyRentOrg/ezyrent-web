'use client';

import AboutUs from '@/components/AboutUs';
import BasedOnYourLocation from '@/components/BasedOnYourLocation';
import DesktopHeroView from '@/components/hero-page/DesktopHeroView';
import MobileHeroView from '@/components/hero-page/MobileHeroView';
import Testimonial from '@/components/testimonial/Testimonial';
import StartYourJourney from '@/components/StartYourJourney';
import OfferSection from '@/components/OfferSection';
import BestDeal from '@/components/BestDeal';
import FAQ from '@/components/FAQ';

export default function Home() {
  return (
    <div>
      <div>
        <DesktopHeroView />
        <MobileHeroView />
      </div>
      <AboutUs />
      <BasedOnYourLocation />
      <OfferSection />
      <BestDeal />
      <Testimonial />
      <FAQ/>
      {/* <StartYourJourney /> */}
    </div>
  );
}
