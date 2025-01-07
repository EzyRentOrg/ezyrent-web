export const navbarMenu: NavbarMenuItem[] = [
  { label: 'rent', href: '#' },
  { label: 'buy', href: '#' },
  {
    label: 'manage property',
    href: '#',
    dropdown: [
      { label: 'Property Management', href: '/property-management' },
      { label: 'Landlord Resources', href: '/landlord-resources' }
    ]
  },
  {
    label: 'about',
    href: '/about'
    // dropdown: [
    //   { label: 'Our Story', href: '/our-story' },
    //   { label: 'Team', href: '/team' },
    //   { label: 'Careers', href: '/careers' }
    // ]
  },
  { label: 'blog', href: '#' }
];

export const navbarMenuAuth: NavbarMenuItem[] = [
  { label: 'login', href: '/login' },
  { label: 'sign up', href: '/register' }
];
