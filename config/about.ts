import React from 'react'
import { House, Star, Wallet } from 'lucide-react';

interface ServiceFeature {
  icon: string;
  title: string;
  description: string;
}

export const serviceFeatures: ServiceFeature[] = [
  {
    icon: 'House',
    title: 'Affordable Housing Options',
    description:
      'A wide range of budget-friendly rental properties to suit various needs.'
  },
  {
    icon: 'Star',
    title: 'Efficient Property Management',
    description:
      'Support landlords with tools to manage properties, tenants, and payments.'
  },
  {
    icon: 'Wallet',
    title: 'Transparent Pricing',
    description:
      'Provide a wide range of budget-friendly rental properties to suit various needs.'
  }
];

export const teamMembers: TeamMember[] = [
  {
    image: 'femi-david.jpeg',
    name: 'Femi David',
    role: 'CEO & Founder',
    description:
      'David is a visionary entrepreneur, with a wealth of experience in business and a passion for transforming spaces. Femi has successfully spearheaded multiple high-impact projects.'
  },
  {
    image: 'adebayo-adekunle.jpeg',
    name: 'Adebayo Adekunle',
    role: 'Chief Operating Officer (COO)',
    description:
      'Adebayo is a seasoned operations expert with over a decade of experience in streamlining processes and enhancing efficiency in real estate.'
  },
  {
    image: 'chinelo-okafor.jpeg',
    name: 'Chinelo Okafor',
    role: 'Chief Financial Officer (CFO)',
    description:
      'Chinelo brings a wealth of financial acumen to the team, with a solid background in corporate finance and investment management. She manages the company’s budgets, & forecasts.'
  },
  {
    image: 'tunde-ajayi.jpeg',
    name: 'Tunde Ajayi',
    role: 'Head of Marketing and Sales',
    description:
      'Tunde is a dynamic marketer with a flair for connecting clients to their dream properties. With his in-depth understanding of market trends and customer behavior.'
  },
  {
    image: 'chinelo-okafor.jpeg',
    name: 'Fatimah Abdullahi',
    role: 'Legal and Compliance Manager',
    description:
      'Fatimah is a skilled legal professional specializing in property law and compliance. She ensures that all transactions and projects adhere to regulatory requirements.'
  },
  {
    image: 'femi-david.jpeg',
    name: 'Obinna Nwosu',
    role: 'Project Manager',
    description:
      'Obinna is a certified project manager with a reputation for delivering complex real estate developments. He oversees planning, execution, and quality control across all company projects.'
  }
];
