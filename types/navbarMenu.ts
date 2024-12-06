export type NavbarMenuItem = {
  label: string;
  href: string;
  dropdown?: {
    label: string;
    href: string;
  }[];
};
