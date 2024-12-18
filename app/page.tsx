'use client';

import AboutUs from '@/components/AboutUs';
import BasedOnYourLocation from '@/components/BasedOnYourLocation';
import Testimonial from '@/components/testimonial/Testimonial';
import OfferSection from '@/components/OfferSection';
import BestDeal from '@/components/BestDeal';
import FAQs from '@/components/FAQs/FAQs';
import HeroPage from '@/components/hero-page/HeroPage';

export default function Home() {
  return (
    <div>
      <div>
        <HeroPage />
      </div>
      <AboutUs />
      <BasedOnYourLocation />
      <OfferSection />
      <BestDeal />
      <Testimonial />
      <FAQs />
      {/* <StartYourJourney /> */}
    </div>
  );
}
