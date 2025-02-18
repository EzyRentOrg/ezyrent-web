declare interface HouseListing {
  isAdmin?: boolean;
  id: string;
  name: string;
  address: string;
  mainImage: string;
  additionalImages?: string[];
  rentDuration?: number;
  beds: number;
  bathrooms: number;
  latitude?: number | null;
  longitude?: number | null;
  landSize: string;
  price: number;
  popular?: string;
  description?: string;
  createdAt?: string;
  location?: string;
  propertyType?: string;
  amenities?: string[];
  postedBy?: string;
  updatedAt?: string;
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

declare interface PrivacyPolicySection {
  title: string;
  content: (string | PrivacyPolicySubContent)[];
}

declare interface PrivacyPolicySubContent {
  description?: string;
  items?: string[];
}

declare interface TeamMember {
  image: string;
  name: string;
  role: string;
  description: string;
}

declare interface FAQType {
  index: number;
  question: string;
  answer: string;
}

declare interface FAQWrapper extends FAQType {
  isOpen: boolean;
  onClick: () => void;
}

declare interface CarouselContent {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  content: string;
}
