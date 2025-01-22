'use client';

import React from 'react';
import Breadcrumb from '@/components/breadcrumb';
import MaxWidthWrapper from '../maxWidthWrapper';
import { Input } from '@/components/ui/input';
import { Search, SlidersHorizontal } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  propertyType,
  minPropertyPrice,
  maxPropertyPrice,
  propertyBeds,
  extraFilters
} from '@/config/property-listing';
import { Button } from '@/components/ui/button';
import Newest from '@/components/Newest';

export default function PropertyListing() {
  return (
    <section>
      <MaxWidthWrapper>
        <Breadcrumb />
        <main className="mt-10">
          <section className="flex flex-col space-y-5 lg:flex-row lg:space-y-0 item-center lg:space-x-5 ">
            <div className="relative w-full">
              <Search className="absolute left-2 top-[30%] " />
              <Input placeholder="Search by address" className="pl-10" />
            </div>
            {/* type and min */}
            <div className="grid grid-col-1 sm:grid-cols-2 gap-5 w-full">
              {/* type */}
              <div>
                <Select>
                  <SelectTrigger className="flex items-center ">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>

                  <SelectContent className="bg-white">
                    {propertyType.map((type: string) => (
                      <SelectItem
                        key={type}
                        value={type}
                        className="capitalize"
                      >
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {/* min price */}
              <div>
                <Select>
                  <SelectTrigger className="flex items-center ">
                    <SelectValue placeholder="Min price" />
                  </SelectTrigger>

                  <SelectContent className="bg-white">
                    {minPropertyPrice.map((minPrice: string) => (
                      <SelectItem
                        key={minPrice}
                        value={minPrice}
                        className="capitalize"
                      >
                        {minPrice}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            {/* max and beds */}
            <div className="grid grid-col-1 md:grid-cols-2 gap-5 w-full">
              {/* max price */}
              <div>
                <Select>
                  <SelectTrigger className="flex items-center ">
                    <SelectValue placeholder="Max price" />
                  </SelectTrigger>

                  <SelectContent className="bg-white">
                    {maxPropertyPrice.map((maxPrice: string) => (
                      <SelectItem
                        key={maxPrice}
                        value={maxPrice}
                        className="capitalize"
                      >
                        {maxPrice}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {/* beds */}
              <div>
                <Select>
                  <SelectTrigger className="flex items-center ">
                    <SelectValue placeholder="Bed" />
                  </SelectTrigger>

                  <SelectContent className="bg-white">
                    {propertyBeds.map((bed: string) => (
                      <SelectItem key={bed} value={bed} className="capitalize">
                        {bed}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            {/* fliter and search */}
            <div className="grid grid-col-1 md:grid-cols-2 gap-5 w-full">
              {/* more filters */}
              <div>
                <Select>
                  <SelectTrigger className="flex items-center  ">
                    <SlidersHorizontal size={12} className="mr-2" />
                    <SelectValue placeholder="filter more" />
                  </SelectTrigger>

                  <SelectContent className="bg-white">
                    {extraFilters.map((filter: string) => (
                      <SelectItem
                        key={filter}
                        value={filter}
                        className="capitalize"
                      >
                        {filter}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {/* search btn */}
              <div>
                <Button className="bg-[#7065F0]">Search</Button>
              </div>
            </div>
          </section>
        </main>
        {/* new houses */}
        <Newest />
      </MaxWidthWrapper>
    </section>
  );
}
