// Content for the carousel
import { RiSecurePaymentLine } from 'react-icons/ri';
import { FaRegRectangleList } from 'react-icons/fa6';
import { FaComments } from 'react-icons/fa';
import { BsFillHouseCheckFill } from 'react-icons/bs';
import { MdManageHistory } from 'react-icons/md';
import { FaListCheck } from 'react-icons/fa6';
import { SiSimpleanalytics } from 'react-icons/si';
import { MdNotificationsActive } from 'react-icons/md';

export const carouselContent: CarouselContent[] = [
  {
    icon: RiSecurePaymentLine,
    title: 'Secure Payment',
    content:
      'The platform includes an escrow service for rent payments, ensuring that funds are securely held until both parties meet their obligations.'
  },
  {
    icon: FaRegRectangleList,

    title: 'Property Listings',
    content:
      'Detailed property listings with high-quality images, accurate descriptions, and price information.'
  },
  {
    icon: FaComments,
    title: 'Direct Communucation',
    content:
      'In-app messaging that allows tenants to easily communicate with landlords or property managers.'
  },
  {
    icon: BsFillHouseCheckFill,

    title: 'Rental Payment',
    content:
      ' Flexible payment options, including subscription-based models and token-based payments, catering to different user preferences.'
  },
  {

    icon: MdManageHistory,

    title: 'Property Management',
    content:
      ' For landlords not residing in the same region as their properties, EzyRent offers property management services to handle tenant interactions, maintenance, and other responsibilities.'
  },
  {

    icon: FaListCheck,

    title: 'Verified Listings',
    content:
      ' Ensuring that all properties listed are verified to prevent fraudulent activities.'
  },
  {

    icon: SiSimpleanalytics,

    title: 'Analytics and Insights',
    content:
      'Tools for landlords to track property engagement and manage their listings effectively.'
  },
  {
    icon: MdNotificationsActive,

    title: 'Notification Alerts',
    content:
      'Personalized alerts for new properties that match tenants’ preferences.'
  }
];
