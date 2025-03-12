'use client';

import React, { use, useCallback, useEffect, useState } from 'react';
import MaxWidthWrapper from '../../maxWidthWrapper';
import Breadcrumb from '@/components/breadcrumb';
import Image from 'next/image';
import { MapPin, Share2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { plusJakartaSans } from '@/lib/font';
import SecurityTips from '@/components/SecurityTips';
import { getCleanImageUrl } from '@/lib/getCleanImageUrl';
import Naira from '@/components/ui/naira';
import { RenderActiveTabContent } from '../components/activeTab';
import ContactModal from '../components/bookModal';
import PropertiesCarousel from '@/components/PropertiesCarousel';

type TabType = 'details' | 'location' | 'contact';

interface ProductDetailsProp {
  params: Promise<{ id: string }>;
}
export default function ProductDetails({ params }: ProductDetailsProp) {
  const [houseDetails, setHouseDetails] = useState<HouseListing | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('details');
  const [openModal, setOpenModal] = useState(false);
  const { id } = use(params);

  //fetch property by id, useCallback to prevent re-rendering
  const fetchPropertiesById = useCallback(async () => {
    try {
      const response = await fetch(`/api/fetch-one-listing?id=${id}`, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch properties: ${response.statusText}`);
      }

      const { data } = await response.json();
      setHouseDetails(data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to fetch properties';
      toast.error(errorMessage);
    }
  }, []);

  useEffect(() => {
    fetchPropertiesById();
  }, [fetchPropertiesById]);

  console.log('houseDetails: ', houseDetails);

  const Tab = () => (
    <div className="flex items-center justify-between lg:space-x-[150px] w-full lg:w-fit border-b-2 border-[#FAFAFA]">
      {(['details', 'location', 'contact'] as const).map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={cn(
            'h-full capitalize text-sm md:text-lg lg:text-[1.25rem] lg:leading-[30px]',
            activeTab === tab
              ? 'text-[#000929] font-medium border-b-2 border-[#7065F0]'
              : 'text-gray-500 hover:text-[#000929] hover:border-b-2 hover:border-[#7065F0]'
          )}
        >
          {tab}
        </button>
      ))}
    </div>
  );

  const handleShare = async () => {
    if (!houseDetails) return;

    const shareData = {
      title: houseDetails.name,
      text: `Check out this property: ${houseDetails.name} at ${houseDetails.address}`,
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success('Link copied to clipboard!');
      }
    } catch (error) {
      toast.error('Error sharing property');
      console.error('Error sharing:', error);
    }
  };

  if (!houseDetails) {
    return (
      <MaxWidthWrapper className="px-0 mx-0 lg:mx-auto lg:w-full">
        <p className="my-20 text-center">Loading...</p>
      </MaxWidthWrapper>
    );
  }

  if (openModal) {
    return <ContactModal openModal={openModal} setOpenModal={setOpenModal} />;
  }
  return (
    <MaxWidthWrapper className="px-0 mx-0 lg:mx-auto lg:w-full">
      <div className="px-5 md:px-0 flex flex-col md:flex-row space-y-4 md:space-y-0 md:justify-between">
        <Breadcrumb />
        {activeTab === 'location' && <Tab />}
      </div>
      <main className="mt-10">
        <div className="flex flex-col space-y-10 lg:space-y-0 lg:flex-row items-start lg:space-x-20 h-auto px-5 md:px-0">
          <section className="relative flex flex-col w-full lg:w-[554px] h-[400px] md:h-[600px]">
            {/* main image */}
            <div className="h-full mb-4">
              <Image
                src={getCleanImageUrl(houseDetails.mainImage)}
                fill
                alt={`Image of ${houseDetails.name}`}
                className="rounded-lg object-cover"
              />
            </div>
            {/* share btn */}
            <div className="absolute top-10 right-5 max-w-[429px] w-fit px-3 py-[10px] flex flex-col space-y-5 items-center">
              <button
                onClick={handleShare}
                className="cursor-pointer flex items-center justify-center bg-[#f1f1f1] rounded-full size-12 hover:bg-[#e5e5e5] transition-colors"
              >
                <Share2 stroke="#7065F0" />
              </button>
            </div>
            {/* other images */}
            <div className=" bg-neutral-50 mt-auto rounded-[90px]  w-full z-5 h-20 px-3 py-[10px] flex justify-between items-center">
              {houseDetails.additionalImages?.map((image, index) => (
                <Image
                  key={index}
                  src={getCleanImageUrl(image)}
                  width={60}
                  height={60}
                  alt={`Additional image ${index + 1} of ${houseDetails.name}`}
                  className="object-cover size-[60px] rounded-tl-[39px] rounded-[8.94px] rounded-bl-[39px]"
                />
              ))}
            </div>
          </section>
          <section className="w-full flex flex-col space-y-5 h-full lg:w-[560px]">
            {(activeTab === 'details' || activeTab === 'contact') && (
              <div className="w-full">
                <div className="flex flex-col md:flex-row lg:flex-col md:items-center lg:items-start justify-between">
                  <h1
                    className={cn(
                      plusJakartaSans.className,
                      'text-[1.25rem] md:text-[2.5rem] -tracking-[1%] font-bold text-[#000929] lg:leading-[60px]'
                    )}
                  >
                    {houseDetails.name}
                  </h1>
                  <p className="my-2 text-base md:text-[1.75rem] font-extrabold flex items-center justify-center w-fit py-3 lg:py-4 px-7 rounded-[30px] bg-black text-[#f1f1f1]">
                    <Naira />
                    {houseDetails.price.toLocaleString()} / year
                  </p>
                </div>
                <p className="mt-1 flex items-center text-sm md:text-[1.25rem] text-[#646569] font-medium lg:leading-[36px]">
                  <MapPin className="mr-[10px] size-[14px] md:size-5" />
                  {houseDetails.address}
                </p>
                <Separator className="bg-[#E6E6E6] h-px my-5" />
              </div>
            )}
            {/* tab content */}
            {(activeTab === 'details' || activeTab === 'contact') && <Tab />}
            <RenderActiveTabContent
              activeTab={activeTab}
              houseDetails={houseDetails}
              setOpenModal={setOpenModal}
            />
          </section>
        </div>
        {activeTab !== 'location' && (
          <section className="pt-[80px] lg:w-[1035px] mx-auto w-full flex flex-col items-center justify-center">
            <h2 className="text-[1.3rem] md:text-[2rem] font-bold text-[#7065F0] lg:leading-[50.4px]">
              Amenities
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 mt-10">
              {houseDetails.amenities?.map((amenity, index) => {
                // const Icon = amenity?.icon;
                return (
                  <div
                    key={`${amenity}-${index}`}
                    className="w-fit flex items-center gap-2 text-[#000929]"
                  >
                    {/* <Icon className="flex-shrink-0 size-[14px] md:size-8" /> */}
                    <span className="text-sm md:text-base">{amenity}</span>
                  </div>
                );
              })}
            </div>
          </section>
        )}
        <SecurityTips />
        <div className="px-5 md:px-0">
          <PropertiesCarousel title="Recommended Properties" />
        </div>
      </main>
    </MaxWidthWrapper>
  );
}
