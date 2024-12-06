import { cn } from '@/lib/utils/cn';
import { Mail, MapPin, Phone } from 'lucide-react';
import React, { ElementType } from 'react';

interface Contact {
  name: string;
  icon: ElementType;
}

const ContactItems: Contact[] = [
  {
    name: '4234 Adetounbo Ademola str, Victoria Island, Lagos. ',
    icon: MapPin
  },
  {
    name: '+234-8127-518-838',
    icon: Phone
  },
  {
    name: 'ezyrent50@gmail.com',
    icon: Mail
  }
];

export default function Contact() {
  return (
    <div className="max-w-[331px] flex flex-col space-y-4">
      <p className="capitalize text-xl font-[500]">contacts</p>
      <div className="flex flex-col space-y-4">
        {ContactItems.map((item, index) => {
          const Icon = item.icon;
          const href = item.name.includes('@')
            ? `mailto:${item.name}`
            : item.name.match(/^\+?[\d\s-]+$/) // Allows digits, spaces, and dashes
              ? `tel:${item.name.replace(/[\s-]+/g, '')}` // Removes spaces and dashes for tel link
              : undefined;

          return (
            <a
              key={index}
              href={href}
              className={cn(
                'w-fit grid grid-cols-[32px_1fr]  md:gap-4  text-[#E6E6E6]',
                href
                  ? 'hover:text-opacity-65 transition-colors duration-150 ease-in-out'
                  : ''
              )}
            >
              <Icon size={24} className="h-4 w-4 md:h-6 md:w-6" />
              <span className="w-full capitalize text-sm md:text-base">
                {item.name}
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
