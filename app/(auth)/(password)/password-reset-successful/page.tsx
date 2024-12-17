'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import Image from 'next/image';
import { lappedImages } from '@/config';
import RightHandAuthPage from '@/components/RightHandAuthPage';
import MaxWidthWrapper from '@/app/maxWidthWrapper';
import { useRouter } from 'next/navigation';

export default function PasswordResetSuccess() {
  const router = useRouter();

  return (
    <section className="max-w-[1400px] min-h-[984px] mx-auto mb-10 flex items-center space-x-10">
      {/* left side */}
      <main className="h-full w-full flex flex-col">
        <div className="bg-[#F8F8F8] h-full mb-10 rounded-[20px] pt-[140px]">
          <MaxWidthWrapper className="ml-5 pb-5">
            <div className="md:w-[80%] mx-auto">
              <div className="my-10 text-center flex flex-col items-center justify-center space-y-4">
                <div className="bg-[#F4EBFF] size-20 rounded-full flex items-center justify-center">
                  <div className="bg-[#7F56D9] rounded-full size-10 flex items-center justify-center">
                    <Check stroke={'#f1f1f1'} size={35} />
                  </div>
                </div>
                <h2 className="max-w-[80%] w-[90%] text-[#344054] text-[1.5rem] font-extrabold leading-[33.6px] -tracking-[2%]">
                  Your password has been successfully reset!
                </h2>
                <p className="first-letter:capitalize my-1px text-[#475467] text-[0.875rem] leading-[28px] font-medium -tracking-[2%] max-w-[80%] w-[90%]">
                  you can now log in with your new password. If you encounter
                  any issues, please contact support
                </p>
              </div>

              <Button
                onClick={() => router.push('/login')}
                type="submit"
                className={cn(
                  'bg-[#000929] h-[72px]  w-full capitalize text-[1.25rem] font-medium leading-[28px] mx-auto rounded-[80px] hover:bg-opacity-85 transition-colors duration-150'
                )}
              >
                Back to Login
              </Button>
            </div>
          </MaxWidthWrapper>
        </div>
        <div className="bg-[#F8F8F8] rounded-[20px] mt-auto">
          <MaxWidthWrapper className="h-[119px] grid place-items-center">
            <div className="flex items-center w-full ">
              <div className="flex items-center -space-x-4 ">
                {lappedImages.map((image, index) => (
                  <div
                    key={image.src + index}
                    className=" rounded-full size-[59px] border-[2px] border-white"
                  >
                    <Image
                      src={`/${image.src}`}
                      width={image.width}
                      height={image.height}
                      alt={image.alt}
                      className="size-full rounded-full object-cover border-[2px] border-white"
                    />
                  </div>
                ))}
              </div>
              <div className="ml-4">
                <p className="text-[#344054] text-[0.75rem] md:text-[1.125rem] font-semibold leading-[25.2px] first-letter:capitalize">
                  Making your next home easy
                </p>
                <p className="text-[0.6rem] md:text-[#0.875rem] text-[#98A2B3] leading-[19.6px]">
                  Join 200k people to find a Home
                </p>
              </div>

              <div className="hidden md:block size-[59px] ml-auto text-[#667085]">
                <Image
                  src={'/icons/arrow-up-right_59x59.svg'}
                  width={59}
                  height={59}
                  alt="Circled right arrow."
                  className="size-full object-cover "
                />
              </div>
            </div>
          </MaxWidthWrapper>
        </div>
      </main>
      {/* right side */}
      <RightHandAuthPage />
    </section>
  );
}
