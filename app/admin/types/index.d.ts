declare interface SidebarItemType {
  title: string;
  href: string;
  icon: ReactNode;
}

// Building type options
declare type propertyType =
  | 'flat'
  | 'apartment'
  | 'shortlet'
  | 'hotel'
  | 'condo';

// Bed options
declare type BedOption = '1' | '2' | '3' | '4' | '5+';

// Bath options
declare type BathOption = '1' | '2' | '3' | '4' | '5+';

// rentDuration options
declare type rentDurationType = 1 | 2 | 3;

// Amenity options
declare type AmenityType =
  | 'Gym'
  | 'POP Ceiling'
  | 'Water Treatment'
  | 'Security'
  | 'Parking Space'
  | 'Spacious Compound'
  | '24/7 Electricity'
  | 'Supermarket Nearby'
  | 'Swimming Pool'
  | 'Fast Internet'
  | 'Restaurants Nearby'
  | 'Free WiFi';

// declare type FileData = {
//   name: string;
//   data: string;
// };

// Main interface for property form data
declare interface PropertyFormData {
  primaryFile: File | null;
  otherFiles: File[];
  name: string;
  price: string;
  address: string;
  landSize: string;
  rentDuration: rentDurationType;
  address: string;
  description: string;
  location: string;
  latitude?: string;
  longitude?: string;
  landSize?: string;
  propertyType: propertyType;
  beds: BedOption;
  baths: BathOption;
  amenities: AmenityType[];
  error?: string | null;
  errorMessage?: string | null;
}

// Type for form submission response
declare interface SubmissionResponse {
  success: boolean;
  message: string;
}
