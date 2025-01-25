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
