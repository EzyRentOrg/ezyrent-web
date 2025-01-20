import { FaGooglePlay, FaApple } from 'react-icons/fa';
import React from 'react';
import MaxWidthWrapper from '../maxWidthWrapper';
import Breadcrumb from '@/components/breadcrumb';
import { DownloadButton } from '@/components/download/download-btn';
import { AnimatedText } from '@/components/animatedText';

export default function DownloadPage() {
  return (
    <section className="">
      <MaxWidthWrapper className=" flex flex-col ">
        <Breadcrumb />
        <main className=" flex flex-col gap-6 md:gap-8 items-center text-center justify-center bg-white py-4 px-2">
          <div className="text-center">
            <p>
              <AnimatedText
                text={'will be available soon'}
                className="text-[#000929] uppercase font-bold md:text-2xl"
              />
            </p>
          </div>
          <div className="bg-[#7065F0] h-[350px] rounded-[3rem] shadow-xl p-8 pt-12 max-w-xl text-[#f1f1f1] md:text-lg w-full flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold text-center mb-2">
                Download Our App
              </h2>
              <p className="  mb-6">
                Get the best experience on your mobile device
              </p>
            </div>

            <div className="space-y-4 md:px-20 px-2">
              <DownloadButton
                href="https://play.google.com/store/apps/details?id=your.app.id"
                icon={FaGooglePlay}
              >
                <div className=" flex flex-col md:flex-row md:gap-2 items-center">
                  <p>Download on</p>
                  <p className="font-bold">Play Store</p>
                </div>
              </DownloadButton>
              <DownloadButton
                href="https://apps.apple.com/us/app/your-app-name/idYOUR_APP_ID"
                icon={FaApple}
              >
                <div className=" flex flex-col md:flex-row md:gap-2 items-center">
                  <p>Download on</p>
                  <p className="font-bold">Apple Store</p>
                </div>
              </DownloadButton>
            </div>
          </div>
        </main>
      </MaxWidthWrapper>
    </section>
  );
}
