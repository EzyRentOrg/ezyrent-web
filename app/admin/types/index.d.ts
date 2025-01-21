declare interface SidebarItemType {
  title: string;
  href: string;
  icon: ReactNode;
}

// Building type options
 declare type BuildingType = "flat" | "apartment" | "shortlet" | "hotel" | "condo";

// Bed options
 declare type BedOption = "1 bed" | "2 beds" | "3 beds" | "4 beds" | "5+ beds";

// Bath options
 declare type BathOption = "1 bath" | "2 baths" | "3 baths" | "4 baths" | "5+ baths";

// Duration options
 declare type DurationType = "1 year" | "2 years" | "3 years";

// Amenity options
declare type AmenityType = 
  | "Gym"
  | "POP Ceiling"
  | "Water Treatment"
  | "Security"
  | "Parking Space"
  | "Spacious Compound"
  | "24/7 Electricity"
  | "Supermarket Nearby"
  | "Swimming Pool"
  | "Fast Internet"
  | "Restaurants Nearby"
  | "Free WiFi";

// Main interface for property form data
declare interface PropertyFormData {
  images: string[];
  price: string;
  duration: DurationType;
  address: string;
  description: string;
  buildingType: BuildingType;
  beds: BedOption;
  baths: BathOption;
  amenities: AmenityType[];
  error: string | null;
  errorMessage: string | null;
}

// Type for form submission response
declare interface SubmissionResponse  {
  success: boolean;
  message: string;
};

