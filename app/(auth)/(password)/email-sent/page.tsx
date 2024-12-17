'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Mail } from 'lucide-react';
import Image from 'next/image';
import { lappedImages } from '@/config';
import RightHandAuthPage from '@/components/RightHandAuthPage';
import MaxWidthWrapper from '@/app/maxWidthWrapper';
import { useRouter } from 'next/navigation';

export default function EmailSent() {
  const router = useRouter();
  const handleResend = () => {
    // Logic for resending the password reset email or api call
    console.log('Resending email...');
    // Trigger the resend process,
  };

  const handleGmail = () => {
    router.push('/reset-password');
  };

  return (
    <section className="max-w-[1400px] min-h-[984px] mx-auto mb-10 flex items-center space-x-10">
      {/* left side */}
      <main className="h-full w-full flex flex-col">
        <div className="bg-[#F8F8F8] h-full mb-10 rounded-[20px] pt-[140px]">
          <MaxWidthWrapper className="ml-5 pb-5">
            <div className="md:w-[80%] mx-auto">
              <div className="my-10 text-center flex flex-col items-center justify-center space-y-4">
                <div className="bg-[#E9D7FE] rounded-full size-20 flex items-center justify-center">
                  <Mail stroke={'#f1f1f1'} fill={'#7F56D9'} size={35} />
                </div>
                <h2 className="capitalize text-[#344054] text-[1.5rem] font-extrabold leading-[33.6px] -tracking-[2%]">
                  Check your email
                </h2>
                <p className="my-1px text-[#475467] text-[0.875rem] leading-[28px] font-medium -tracking-[2%] w-[80%]">
                  We sent a password reset link to your email. Please check your
                  inbox
                </p>
              </div>

              <Button
                onClick={handleGmail}
                type="submit"
                className={cn(
                  'bg-[#000929] h-[72px]  w-full capitalize text-[1.25rem] font-medium leading-[28px] mx-auto rounded-[80px] hover:bg-opacity-85 transition-colors duration-150'
                )}
              >
                Open Gmail
              </Button>

              {/* resend */}
              <div className="flex items-center justify-center mt-5 font-medium text-[1rem] leading-[22.4px]">
                Didn&apos;t receive the email?{' '}
                <Button
                  onClick={handleResend}
                  variant={'ghost'}
                  className="capitalize text-[#6941C6] text-[1rem] leading-[22.4px]"
                >
                  Resend
                </Button>
              </div>
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
