import {
  LayoutDashboard,
  House,
  Banknote,
  TrendingUpDownIcon,
  Book,
  Star
} from 'lucide-react';

export const siderbarItems: SidebarItemType[] = [
  { title: 'dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  {
    title: 'property management',
    href: '/admin/property-management',
    icon: House
  },
  { title: 'finance', href: '/admin/finance', icon: Banknote },
  { title: 'analytics', href: '/admin/analytics', icon: TrendingUpDownIcon },
  { title: 'blogs', href: '/admin/blogs', icon: Book },
  { title: 'reviews', href: '/admin/reviews', icon: Star }
];

export const ITEMS_PER_PAGE = 10;
export const PROPERTY_TYPES = [
  { value: 'all', label: 'All Types' },
  { value: 'condo', label: 'Condo' },
  { value: 'hotel', label: 'Hotel' },
  { value: 'flat', label: 'Flat' },
  { value: 'shortlet', label: 'Shortlet' },
  { value: 'apartment', label: 'Apartment' }
];

export const SORT_OPTIONS = [
  { value: 'createdAt', label: 'Date Added' },
  { value: 'price', label: 'Price' },
  { value: 'title', label: 'Title' }
];
