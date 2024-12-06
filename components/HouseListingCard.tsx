'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { CardContent, CardFooter, CardTitle } from './ui/card';
import { BedDouble, Bath, Diamond, Heart } from 'lucide-react';
import { HouseListing as HouseListingType } from '@/types/houseListing';
import PopularLabel from './PopularLabel';
import Link from 'next/link';

export default function HouseListingCard({
  id,
  title,
  address,
  image,
  bedrooms,
  bathrooms,
  sqrFt,
  price,
  popular
}: HouseListingType) {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <Link
      href={`/house-details/${id}`}
      passHref
      className="w-full rounded-lg shadow-md relative cursor-pointer transform transition duration-200 hover:shadow-lg md:hover:scale-[1.05]"
    >
      {/* Popular Badge */}
      {popular && (
        <PopularLabel
          text={popular}
          className="-ml-3 absolute z-[3] top-[40%]"
        />
      )}

      {/* Image Section */}
      <div className="h-48 w-full rounded-t-lg overflow-hidden">
        <Image
          src={image}
          width={352}
          height={200}
          alt={`Image of a house located at ${address}.`}
          className="w-full object-cover h-full transition duration-150 ease-in-out hover:scale-[1.05]"
        />
      </div>

      {/* Card Content */}
      <CardContent className="p-4 flex flex-col space-y-2">
        <div className="flex items-center">
          <p className="text-2xl text-[#7065F0] font-[800] leading-9 -tracking-[1px]">
            ${price.toLocaleString()}
            <span className="ml-1 text-[#000929] leading-6 text-[1rem] font-[400]">
              / month
            </span>
          </p>
          {/* Favorite Icon */}
          <div
            className="p-4 cursor-pointer ml-auto rounded-full border border-[#E8E6F9] flex justify-end"
            onClick={toggleFavorite}
          >
            <Heart
              className={`w-6 h-6 text-[#7065F0] ${
                isFavorite && 'fill-[#7065F0]'
              }`}
            />
          </div>
        </div>
        <CardTitle className="text-2xl font-[700] -tracking-[1px] leading-9">
          {title}
        </CardTitle>
        <p className="text-gray-500 text-sm">{address}</p>
      </CardContent>

      <CardFooter className="flex flex-col space-y-4">
        <div className="bg-[#F0EFFB] h-[1.5px]"></div>
        {/* Details Section */}
        <div className="w-full flex justify-between items-center text-gray-700">
          <div className="flex items-center space-x-1">
            <BedDouble className="w-5 h-5 text-[#7065F0]" />
            <span className="capitalize">
              {bedrooms} {bedrooms > 1 ? 'Beds' : 'Bed'}
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <Bath className="w-5 h-5 text-[#7065F0]" />
            <span className="capitalize">
              {bathrooms} {bathrooms > 1 ? 'Baths' : 'Bath'}
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <Diamond className="w-5 h-5 text-[#7065F0]" />
            <span>{sqrFt} m²</span>
          </div>
        </div>
      </CardFooter>
    </Link>
  );
}
