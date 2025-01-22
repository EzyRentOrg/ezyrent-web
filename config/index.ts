import {
  Bath,
  Blinds,
  CarFront,
  Cctv,
  Dam,
  Droplet,
  Dumbbell,
  House,
  PersonStanding,
  Plug2,
  ShoppingCart,
  Utensils,
  UtilityPole,
  Wifi,
  Zap
} from 'lucide-react';

export const lappedImages: lappedImageType[] = [
  {
    src: 'melanin-lady-on-afro-hair_480x480.jpg',
    width: 480,
    height: 480,
    alt: 'A melanin lady on afro hair.'
  },
  {
    src: 'a-light-skinned-lady_480x320.jpg',
    width: 480,
    height: 320,
    alt: 'A light skinned lady.'
  },
  {
    src: 'a-handsome-guy-on-cozy-cap_320x480.jpg',
    width: 320,
    height: 480,
    alt: 'A handsome guy on a cozy cap.'
  }
];

export const houseAmenities: HouseAmenity[] = [
  { item: '24/7 Electricity', icon: Plug2 },
  { item: 'Internet', icon: Zap },
  { item: 'Water Treatment', icon: Droplet },
  { item: 'POP Ceiling', icon: Blinds },
  { item: 'Street Lights', icon: UtilityPole },
  { item: 'Spacious Compound', icon: House },
  { item: '24/7 Security', icon: PersonStanding },
  { item: 'Supermarket Nearby', icon: ShoppingCart },
  { item: 'All Bathrooms Ensuit', icon: Bath },
  { item: 'CCTV Cameras', icon: Cctv },
  { item: 'Drainage System', icon: Dam },
  { item: 'Gym Nearby', icon: Dumbbell },
  { item: 'Restaurants Nearby', icon: Utensils },
  { item: 'Free WIFI', icon: Wifi },
  { item: 'Parking Space', icon: CarFront }
];

export const securityTips: SecurityTip[] = [
  {
    tip: 'Do not make any inspection fee without seeing the property manager and property.'
  },
  {
    tip: 'Only pay Rental fee, Sales fee or any upfront payment after you verify the Landlord.'
  },
  { tip: 'Ensure you meet the Property manager in an open location.' }
];
