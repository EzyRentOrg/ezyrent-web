/* eslint-disable @typescript-eslint/no-unused-vars */

import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';

interface ProfileType {
  title: 'Landlord' | 'Tenant' | 'Property Manager';
  description: string;
  iconSrc?: string;
}

const profiles: ProfileType[] = [
  {
    title: 'Landlord',
    description: 'Home owner looking to lease/rent out an apartment',
    iconSrc: '/human_32x32.svg'
  },
  {
    title: 'Tenant',
    description: 'Home seeker looking to lease/rent an apartment',
    iconSrc: '/human_32x32.svg'
  },
  {
    title: 'Property Manager',
    description: 'One who is certified to manage and act as a caretaker',
    iconSrc: '/human_32x32.svg'
  }
];

interface SelectProfileTypeProps {
  onComplete: (type: ProfileType['title']) => void;
}

export default function SelectProfileType({
  onComplete
}: SelectProfileTypeProps) {
  const handleSelection = (type: ProfileType['title']) => {
    onComplete(type);
  };

  return (
    <div className="w-full">
      <h2 className="text-[1.4rem] md:text-2xl lg:text-4xl font-bold text-[#7065F0]">
        Select a profile
      </h2>
      <p className="text-sm md:text-lg text-[#111113] w-full lg:w-[480px] mt-4">
        This way you get to choose what profile you want, it could be as a
        Landlord, Tenant, or a Property Manager.
      </p>
      <div className="mt-10 flex flex-col space-y-4">
        {profiles.map((profile) => (
          <button
            key={profile.title}
            onClick={() => handleSelection(profile.title)}
            aria-label={`Select ${profile.title} profile`}
            className={cn(
              'flex items-center space-x-4 md:space-x-8 bg-[#F1F1FE] px-6 py-3 rounded-lg hover:bg-opacity-65'
            )}
          >
            {profile.iconSrc && (
              <div className="w-8 h-8">
                <Image
                  alt={`${profile.title} icon`}
                  src={profile.iconSrc}
                  width={32}
                  height={32}
                  className="w-full h-full"
                />
              </div>
            )}
            <div className="text-left">
              <p className="text-[1.25rem] md:text-[1.5rem] font-medium text-[#000929]">
                {profile.title}
              </p>
              <p className="text-[#333333] text-xs md:text-sm">
                {profile.description}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
