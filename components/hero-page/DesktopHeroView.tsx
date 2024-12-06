import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils/cn';
import { House, MapPin, PlayCircle, Search, Wallet } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import HeroBanner from '@/components/HeroBanner';
import ClientLayout from '@/app/clientLayout';

export default function DesktopHeroView() {
  return (
    <header className=" hidden md:block bg-desktop-gradient min:h-screen ipad-height-adjust pt-[96px]">
      <ClientLayout className="">
        {/* right side */}
        <div className="flex ">
          <div className="mt-14 xl:mt-24 flex flex-col space-y-5">
            <h1 className="uppercase text-[2rem]  lg:text-[3rem] xl:text-[4rem] lg:leading-[89.6px] font-[900] text-[#7065F0]">
              FIND A HOME <br />
              THAT SUITS YOU
            </h1>
            <p className="font-normal text-[1.1rem] xl:text-[1.25rem] leading-7 text-[#100A55] ">
              Want to find a home? We are ready to help you <br />
              find one that suits your lifestyle and needs
            </p>

            {/* cta */}
            <div className="flex items-center gap-4 ">
              <Button
                variant="default"
                size="lg"
                className={cn(
                  'h-[54px] capitalize text-[1.25rem] text-[#f1f1f1] leading-5'
                )}
              >
                discover now
              </Button>
              <Button
                variant="outline"
                size="lg"
                className={cn(
                  'border-[#7065F0] h-[54px] capitalize text-[1.25rem] text-[#7065F0] hover:text-[#7065f0]/70 leading-5'
                )}
              >
                watch now <PlayCircle size={24} />
              </Button>
            </div>
          </div>
          {/* left side */}
          <div className="md:-mr-48 lg:-mr-48">
            <Image
              src={'/hero/desktopHeroImage_1102x617.webp'}
              width={1102}
              height={617}
              alt="A beautiful house with a penthouse"
              className="w-full h-full"
            />
          </div>
        </div>
        {/* banner */}
        <div className="w-full -mt-10 lg:-mt-20 xl:-mt-28 hero_banner bg-opacity-60 shadow-md backdrop-blur-md h-28 z-5 flex items-center space-x-4 px-8">
          <div className="w-full flex items-center justify-between">
            <HeroBanner
              icon={<MapPin size={20} />}
              type="Location"
              text="Banana Island, Lagos"
            />
            <Separator
              orientation="vertical"
              className="bg-[#ffffff] h-12 w-[1px]"
            />
            <HeroBanner
              icon={<House size={20} />}
              type="Property Type"
              text="Classic Apartment"
            />
            <Separator
              orientation="vertical"
              className="bg-[#ffffff] h-12 w-[1px]"
            />
            <HeroBanner
              icon={<Wallet size={20} />}
              type="Budget"
              text="N900 - N1.7M"
            />
            <Separator
              orientation="vertical"
              className="bg-[#ffffff] h-12 w-[1px]"
            />
            <Button
              size="lg"
              variant="default"
              className="bg-[#7065F0] h-12 w-16 -ml-10"
            >
              <Search size={32} className="text-stone-300 h-8 w-8" />
            </Button>
          </div>
        </div>
      </ClientLayout>
    </header>
  );
}
