declare interface HouseListing {
  id: string;
  title: string;
  address: string;
  image: string;
  bedrooms: number;
  bathrooms: number;
  sqrFt: string;
  price: number;
  popular?: string;
  description?: string;
}

declare interface NavbarMenuItem {
  label: string;
  href: string;
  dropdown?: {
    label: string;
    href: string;
  }[];
}

declare interface socialIcon {
  label: string;
  href: string;
  icon: string;
}

declare interface Testimonial {
  image: string;
  name: string;
  jobTitle: string;
  quote: string;
  star: number;
}

declare interface lappedImageType {
  src: string;
  width: number;
  height: number;
  alt: string;
}

declare interface BreadcrumbItem {
  label: string;
  href: string;
  isActive: boolean;
}

declare interface HouseAmenity {
  item: string;
  icon: ReactNode;
}

declare interface SecurityTip {
  tip: string;
  description?: string;
}

type PrivacyPolicySection = {
  title: string;
  content: (string | PrivacyPolicySubContent)[];
};

type PrivacyPolicySubContent = {
  description?: string;
  items?: string[];
};
