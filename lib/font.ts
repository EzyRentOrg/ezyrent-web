import { DM_Sans, Plus_Jakarta_Sans } from 'next/font/google';

const dmSans = DM_Sans({
  subsets: ['latin'],
  fallback: ['Arial', 'Helvetica', 'sans-serif'],
  weight: [
    '100',
    '200',
    '300',
    '400',
    '500',
    '600',
    '700',
    '800',
    '900',
    '1000'
  ]
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800']
});

export { dmSans, plusJakartaSans };
