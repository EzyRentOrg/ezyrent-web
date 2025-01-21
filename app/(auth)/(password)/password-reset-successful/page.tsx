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
import LappedImages from '@/components/LappedImages';

export default function PasswordResetSuccess() {
  const router = useRouter();

  return (
    <MaxWidthWrapper>
      <section className="min-h-[984px] mx-auto mb-10 flex items-center space-x-10">
        {/* left side */}

        <main className="h-[964px] w-full flex flex-col ">
          <div className="bg-[#F8F8F8] h-full mb-10 rounded-[20px] pt-[140px]">
            <div className="ml-5 pb-5">
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
            </div>
          </div>

          {/* lapped images */}
          <LappedImages />
        </main>
        {/* right side */}
        <RightHandAuthPage />
      </section>
    </MaxWidthWrapper>
  );
}
