'use client';

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

export default function Home() {
  return (
    <div>
      <Header />
      <div>
        <HeroPage />
      </div>
      <AboutUs />
      <BasedOnYourLocation />
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
