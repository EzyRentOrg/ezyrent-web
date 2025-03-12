'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { House, Star, Wallet, LucideProps } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  text: string;
  iconName: string;
  index: number;
}

// Function to map icon name to Lucide icon
const getIcon = (iconName: string) => {
  const icons: { [key: string]: React.ComponentType<LucideProps> } = {
    House,
    Star,
    Wallet
  };
  return icons[iconName] || House; // Default to House if icon not found
};

export default function ServiceCard({
  title,
  text,
  iconName,
  index
}: ServiceCardProps) {
  const Icon = getIcon(iconName); // Get the correct icon component

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.3, duration: 0.6, ease: 'easeOut' }}
      viewport={{ once: true }}
    >
      {/* Triangle positioned below parent container (anchor) */}
      <div className="absolute w-0 h-0 top-[70px] -left-2 rotate-180 border-l-[50px] border-l-transparent border-r-[50px] border-r-transparent border-b-[100px] border-b-[#7065F0]" />

      {/* Large index number positioned to be partially visible */}
      <div
        className={`hidden md:block absolute top-[50px] ${index !== 1 ? '-left-[90px]' : '-left-[70px]'} text-[15rem] text-[#7065F0] opacity-30 font-bold`}
      >
        {index}
      </div>

      {/* Parent container */}
      <div className="relative pt-20 flex flex-col items-center space-y-5 bg-white drop-shadow-lg border-l border-b shadow-black transform -skew-x-[13deg] skew-y-2 h-[400px] max-w-[250px] px-4 z-10">
        {/* Label */}
        <div className="absolute top-3 -left-10 rounded-tl rounded-bl rounded-full h-16 w-[150px] bg-[#7065F0] shadow-lg shadow-gray-400 flex items-center justify-center">
          {/* Icon */}
          <div className="rounded-full size-[38px] bg-gray-50 flex items-center justify-center">
            <Icon size={20} />
          </div>
        </div>

        {/* Text Wrapper to Remove Skew */}
        <div className="transform skew-x-[5deg] -skew-y-2 px-5 ">
          <h3 className="text-lg my-5 md:text-xl lg:text-2xl font-semibold text-[#000929] text-left">
            {title}
          </h3>
          <p className=" text-base md:text-lg text-[#000929] text-left">
            {text}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

