export const rentDurations: rentDurationType[] = [1, 2, 3];

export const propertyTypes: propertyType[] = [
  'apartment',
  'shortlet',
  'flat',
  'hotel',
  'condo'
];
export const bedOptions: BedOption[] = ['1', '2', '3', '4', '5+'];
export const bathOptions: BathOption[] = ['1', '2', '3', '4', '5+'];
export const amenityOptions: AmenityType[] = [
  'Gym',
  'POP Ceiling',
  'Water Treatment',
  'Security',
  'Parking Space',
  'Spacious Compound',
  '24/7 Electricity',
  'Supermarket Nearby',
  'Swimming Pool',
  'Fast Internet',
  'Restaurants Nearby',
  'Free WiFi'
];

export const MAX_IMAGES = 7;
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const MAX_ADDRESS_LENGTH = 150;
export const MAX_DESCRIPTION_LENGTH = 1500;
export const VALID_IMAGE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp'
];
export const VALID_VIDEO_TYPES = ['video/mp4', 'video/webm', 'video/ogg'];
