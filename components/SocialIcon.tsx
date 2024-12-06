'use client';

import { socialIcons } from '@/config/social-icon';
import Image from 'next/image';
import React from 'react';

export default function SocialIcon() {
  return (
    <div className="flex items-center justify-center w-full !mt-10 space-x-6">
      {socialIcons.map((item, index) => (
        <a
          key={index}
          href={item.href}
          target="_blank"
          style={{ color: '#E6E6E6', width: 24 }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.65')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          rel="noopener noreferrer"
        >
          <span className="sr-only">{item.label}</span>
          <Image
            src={`/social-icon/${item.icon}`}
            alt={`${item.label} svg`}
            width={24}
            height={24}
          />
        </a>
      ))}
    </div>
  );
}
