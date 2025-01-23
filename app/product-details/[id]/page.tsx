'use client';

import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import MaxWidthWrapper from '../../maxWidthWrapper';
import Breadcrumb from '@/components/breadcrumb';
import Image from 'next/image';
import {
  ArrowUp,
  BadgeCheck,
  Bath,
  BedDouble,
  Diamond,
  Mail,
  MapPin,
  Phone,
  Share2
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { plusJakartaSans } from '@/lib/font';
import { houseAmenities } from '@/config';
import SecurityTips from '@/components/SecurityTips';
import RecommendedProperties from '@/components/Recommended';
import { Button } from '@/components/ui/button';
import CopyToClipboard from '@/components/CopyToClipboard';
import Link from 'next/link';

const DynamicHouseMap = dynamic(() => import('@/components/HouseMap'), {
  loading: () => <p>Loading...</p>,
  ssr: false
});

export default function ProductDetails() {
  const [houseDetails, setHouseDetails] = useState<HouseListing | null>(null);
  const [activeTab, setActiveTab] = useState('details');

  // get stored property, chnage with redux later
  useEffect(() => {
    try {
      const storedHouse = localStorage.getItem('selectedHouse');
      if (storedHouse) {
        const house = JSON.parse(storedHouse);
        setHouseDetails(house);
        // Check if house is in favorites
        // const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        // setIsFavorite(
        //   favorites.some((fav: HouseListing) => fav.id === house.id)
        // );
      }
    } catch (error) {
      console.error('Failed to parse house data:', error);
    }
  }, []);

  // tab
  const Tab = () => (
    <div className=" flex items-center justify-between lg:space-x-[150px] w-full lg:w-fit border-b-2 border-[#FAFAFA]">
      {['details', 'location', 'contact'].map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={cn(
            'h-full capitalize text-sm md:text-lg lg:text-[1.25rem] lg:leading-[30px] ',
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

  // show content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'location':
        return <DynamicHouseMap address={houseDetails?.address} />;
      case 'contact':
        return (
          <div className="!mt-10 space-y-4">
            {/* TODO: make this from the user profile */}
            <div className="flex space-x-4">
              <div className="rounded-full size-[60px]">
                <Image
                  src={'/john-320x480.webp'}
                  width={60}
                  height={60}
                  alt="image"
                  className="rounded-full size-[60px]"
                />
              </div>
              <div className="mb-5">
                {/* name and verification badge */}
                <div className="flex items-center space-x-2">
                  <p className="text-[#000929] font-medium text-base md:text-[1.5rem] lg:leading-[36px]">
                    Tochukwu Nwosa
                  </p>
                  <span>
                    <BadgeCheck size={24} fill="#7065F0" stroke="#fafafa" />
                  </span>
                </div>
                {/* user type */}
                <div className="flex items-center space-x-2 text-[#000929] font-light lg:leading-[24px] text-sm">
                  <span>Landlord</span>
                  <span>•</span>
                  <span>5 houses posted</span>
                </div>
              </div>
            </div>
            <Separator className="bg-[#E6E6E6]" />
            {/* phone number and email */}
            <div className="!my-10 space-y-2 text-[#344054] w-full lg:w-[500px]">
              <div className="w-full flex items-center justify-between">
                <p className="flex items-center space-x-2">
                  <Phone size={16} stroke="#344054" />
                  <span className="ml-2 text-base">+234-8127-518-838</span>
                </p>
                <CopyToClipboard textToCopy="+234-8127-518-838" type="phone" />
              </div>
            </div>
            <div className="!my-10 space-y-2 text-[#344054] w-full lg:w-[500px]">
              <div className="w-full flex items-center justify-between">
                <p className="flex items-center space-x-2">
                  <Mail size={16} stroke="#344054" />
                  <span className="ml-2 text-base">ezyrent50@gmail.com</span>
                </p>
                <CopyToClipboard
                  textToCopy="ezyrent50@gmail.com"
                  type="email"
                />
              </div>
            </div>
            <Separator className="bg-[#E6E6E6]" />
            {/* book now and schedule tour*/}
            <div className="!mt-10 lg:!mt-5 flex flex-col space-y-4 md:flex-row md:space-y-0 md:items-center md:justify-between">
              <Link href="/download">
                <Button className="bg-[#7065F0] h-[67px] rounded-[40px] py-3 px-12">
                  Book Now
                  <ArrowUp className="rotate-[30deg]" />
                </Button>
              </Link>
              <Link href={'/download'}>
                <Button
                  variant={'outline'}
                  className="border-[#7065F0] h-[67px] px-12 py-3 rounded-[40px] text-[#7065F0]"
                >
                  Schedule Tour
                  <ArrowUp className="rotate-[30deg]" />
                </Button>
              </Link>
            </div>
          </div>
        );
      default:
        return (
          <>
            {/* description */}
            <p className="text-[#212121] text-sm md:text-[1.1rem] font-normal leading-[30.4px]">
              {houseDetails?.description}
            </p>
            {/* bath, bed and sqrt */}
            <div className="w-full flex justify-between items-center text-gray-700 mt-auto">
              <div className="flex items-center space-x-1">
                <BedDouble className="w-5 h-5 text-[#7065F0]" />
                <span className="capitalize">
                  {houseDetails?.bedrooms ?? 0}{' '}
                  {(houseDetails?.bedrooms ?? 0) > 1 ? 'Beds' : 'Bed'}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <Bath className="w-5 h-5 text-[#7065F0]" />
                <span className="capitalize">
                  {houseDetails?.bathrooms}{' '}
                  {(houseDetails?.bathrooms ?? 0) > 1 ? 'Baths' : 'Bath'}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <Diamond className="w-5 h-5 text-[#7065F0]" />
                <span>{houseDetails?.sqrFt} m²</span>
              </div>
            </div>
          </>
        );
    }
  };

  // handle favorite
  // const handleFavorite = () => {
  //   if (!houseDetails) return;

  //   const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  //   let newFavorites;

  //   if (isFavorite) {
  //     newFavorites = favorites.filter(
  //       (fav: HouseListing) => fav.id !== houseDetails.id
  //     );
  //   } else {
  //     newFavorites = [...favorites, houseDetails];
  //   }

  //   localStorage.setItem('favorites', JSON.stringify(newFavorites));
  //   setIsFavorite(!isFavorite);
  // };

  // handle share
  const handleShare = async () => {
    if (!houseDetails) return;

    const shareData = {
      title: houseDetails.title,
      text: `Check out this property: ${houseDetails.title} at ${houseDetails.address}`,
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        // You might want to add a toast notification here
        toast.success('Link copied to clipboard!');
      }
    } catch (error) {
      toast.error('Error sharing data');
      console.error('Error sharing:', error);
    }
  };

  return (
    <MaxWidthWrapper className="px-0 mx-0 lg:mx-auto lg:w-full">
      {/* breabcrumb and tab */}
      <div className="px-5 md:px-0 flex flex-col md:flex-row space-y-4 md:space-y-0 md:justify-between">
        <Breadcrumb />
        {activeTab === 'location' && <Tab />}
      </div>
      {houseDetails ? (
        <main className="mt-10">
          <div className="flex flex-col space-y-10 lg:space-y-0 lg:flex-row items-start lg:space-x-20 h-auto px-5 md:px-0">
            {/* images */}
            <section className="relative w-full lg:w-[554px] h-[400px] md:h-[600px]">
              <div className="h-[400px] md:h-[600px]">
                <Image
                  src={houseDetails.image}
                  fill
                  alt={`Image of ${houseDetails.title}`}
                  className="rounded-lg object-cover"
                />
              </div>
              {/* favorite and share */}
              <div className="absolute top-10 right-5 max-w-[429px] w-fit px-3 py-[10px] flex flex-col space-y-5 items-center">
                {/* TODO: Add favorite to the user favorite house selection */}
                {/* <button
                      onClick={handleFavorite}
                      className="cursor-pointer flex items-center justify-center bg-[#f1f1f1] rounded-full size-12 hover:bg-[#e5e5e5] transition-colors"
                    >
                      <Heart
                        stroke="#7065F0"
                        fill={isFavorite ? '#7065F0' : 'none'}
                        className={cn(
                          'transition-colors',
                          isFavorite && 'text-[#7065F0]'
                        )}
                      />
                    </button> */}
                <button
                  onClick={handleShare}
                  className="cursor-pointer flex items-center justify-center bg-[#f1f1f1] rounded-full size-12 hover:bg-[#e5e5e5] transition-colors"
                >
                  <Share2 stroke="#7065F0" />
                </button>
              </div>
              {/* other house images */}
              {/* TODO: Change the houses to the  pictures of houses and when clicked, the picture clicked should replace the big image while big image becomes other image*/}
              <div className="absolute bottom-5 md:right-5 bg-white rounded-[90px] max-w-[429px] w-full h-20 px-3 py-[10px] flex justify-between items-center">
                <Image
                  src={houseDetails.image}
                  width={60}
                  height={60}
                  alt={`Image of ${houseDetails.title}`}
                  className="hidden md:block object-cover size-[60px]  rounded-tl-[39px] rounded-[8.94px] rounded-bl-[39px]"
                />
                <Image
                  src={houseDetails.image}
                  width={60}
                  height={60}
                  alt={`Image of ${houseDetails.title}`}
                  className="object-cover size-[60px] rounded-[8.94px]"
                />
                <Image
                  src={houseDetails.image}
                  width={60}
                  height={60}
                  alt={`Image of ${houseDetails.title}`}
                  className="object-cover size-[60px] rounded-[8.94px]"
                />
                <Image
                  src={houseDetails.image}
                  width={60}
                  height={60}
                  alt={`Image of ${houseDetails.title}`}
                  className="object-cover size-[60px] rounded-[8.94px]"
                />
                <Image
                  src={houseDetails.image}
                  width={60}
                  height={60}
                  alt={`Image of ${houseDetails.title}`}
                  className="object-cover size-[60px] rounded-tr-[39px] rounded-[8.94px] rounded-br-[39px]"
                />
              </div>
            </section>
            {/* details */}
            <section className="w-full flex flex-col space-y-5 h-full lg:w-[560px]">
              {/* title, price and location */}
              {(activeTab === 'details' || activeTab === 'contact') && (
                <div className="w-full">
                  <div className="flex flex-col md:flex-row lg:flex-col md:items-center lg:items-start justify-between">
                    <h1
                      className={cn(
                        plusJakartaSans.className,
                        'text-[1.25rem] md:text-[2.5rem] -tracking-[1%] font-bold text-[#000929] lg:leading-[60px]'
                      )}
                    >
                      {houseDetails.title}
                    </h1>
                    <p className="my-2 text-base md:text-[1.75rem] font-extrabold flex items-center justify-center w-fit py-3 lg:py-4 px-7 rounded-[30px] bg-black text-[#f1f1f1]">
                      <Image
                        src={'/icons/Naira_28x28.png'}
                        width={28}
                        height={28}
                        alt="Naira symbol"
                        className="size-7"
                      />{' '}
                      {houseDetails.price.toLocaleString()} / year
                    </p>
                  </div>
                  {/* address */}
                  <p className="mt-1 flex items-center text-sm md:text-[1.25rem] text-[#646569] font-medium lg:leading-[36px]">
                    <MapPin className="mr-[10px] size-[14px] md:size-5" />
                    {houseDetails.address}
                  </p>
                  <Separator className="bg-[#E6E6E6] h-px my-5" />
                </div>
              )}
              {/* tab */}
              {(activeTab === 'details' || activeTab === 'contact') && <Tab />}
              {/* tab content */}
              {renderTabContent()}
            </section>
          </div>
          {/* Amenities */}
          {/* TODO: Add an input for amentites in listing page */}
          {activeTab !== 'location' && (
            <section className="pt-[80px] lg:w-[1035px] mx-auto w-full flex flex-col items-center justify-center">
              <h2 className="text-[1.3rem] md:text-[2rem] font-bold text-[#7065F0] lg:leading-[50.4px] ">
                Amenities
              </h2>
              <ul className="grid grid-cols-2 sm:grid-cols-3 gap-5 md:gap-20 mt-10">
                {houseAmenities.map((amenity, index) => {
                  const Icon = amenity.icon;
                  const item = amenity.item;
                  return (
                    <li
                      key={`${amenity.item}-${index}`}
                      className="w-fit flex items-center gap-2 text-[#000929]"
                    >
                      <Icon className="flex-shrink-0 size-[14px] md:size-8" />
                      <span className="text-sm md:text-base lg:text-[1.25rem] lg:leading-[30px]">
                        {item}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </section>
          )}
          {/* security tips */}
          <SecurityTips />
          {/* recommended properties */}
          {/* TODO: Use map to show recommended properties */}
          <div className="px-5 md:px-0">
            <RecommendedProperties />
          </div>
        </main>
      ) : (
        <p className="my-20 text-center">Loading...</p>
      )}
    </MaxWidthWrapper>
  );
}
