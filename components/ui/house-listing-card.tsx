'use client';

import Image from 'next/image';
import { CardContent, CardFooter, CardTitle } from './card';
import { BedDouble, Bath, Diamond } from 'lucide-react';
import PopularLabel from '../PopularLabel';
import Link from 'next/link';

export default function HouseListingCard({
  id,
  title,
  address,
  image,
  beds,
  bathrooms,
  landSize,
  description,
  price,
  popular
}: HouseListing) {
  // const toggleFavorite = (e: React.MouseEvent) => {
  //   e.stopPropagation();
  //   setIsFavorite(!isFavorite);
  // };

  const handleCardClick = () => {
    const cardDetails = {
      id,
      title,
      address,
      image,
      beds,
      bathrooms,
      landSize,
      price,
      popular,
      description
    };
    localStorage.setItem('selectedHouse', JSON.stringify(cardDetails));
  };

  return (
    <Link
      href={`/product-details/${id}`}
      passHref
      className="w-full max-w-[320px] rounded-lg shadow-md relative cursor-pointer group"
      onClick={handleCardClick}
    >
      {popular && (
        <PopularLabel
          text={popular}
          className="-ml-3 absolute z-[3] top-[40%]"
        />
      )}
      <div className="h-48 w-full rounded-t-lg overflow-hidden">
        <Image
          src={image}
          width={352}
          height={200}
          alt={`Image of a house located at ${address}.`}
          className="w-full object-cover h-full transition duration-150 ease-in-out group-hover:scale-[1.05]"
        />
      </div>
      <CardContent className="mt-5 p-4 flex flex-col space-y-2">
        <div className="flex items-center">
          <p className="flex items-center text-2xl text-[#7065F0] font-[800] leading-9">
            ${price.toLocaleString()}
            <span className="ml-1 text-[#000929]  text-[1rem] font-[400]">
              / year
            </span>
          </p>
          {/* favorite */}
          {/* <div
            className="p-4 cursor-pointer ml-auto rounded-full border border-[#E8E6F9] flex justify-end"
            onClick={toggleFavorite}
          >
            <Heart
              className={`w-6 h-6 text-[#7065F0] ${
                isFavorite && 'fill-[#7065F0]'
              }`}
            />
          </div> */}
        </div>
        <CardTitle className="text-2xl font-[700] -tracking-[1px] leading-9">
          {title}
        </CardTitle>
        <p className="text-gray-500 text-sm">{address}</p>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        {/* separator */}
        <div className="bg-[#F0EFFB] h-[1.5px]"></div>
        {/* beds, baths and sqr */}
        <div className="w-full flex justify-between items-center text-gray-700">
          <div className="flex items-center space-x-1">
            <BedDouble className="w-5 h-5 text-[#7065F0]" />
            <span className="capitalize">
              {beds} {beds > 1 ? 'Beds' : 'Bed'}
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
            <span>{landSize} m²</span>
          </div>
        </div>
      </CardFooter>
    </Link>
  );
}
