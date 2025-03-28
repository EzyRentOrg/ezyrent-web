import { dmSans } from '@/lib/font';
import { cn } from '@/lib/utils';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Toaster } from 'sonner';
// import { generateMetadata } from '@/lib/metadata';
import './globals.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'EzyRent - Rent Smarter, Live Easier',
  description:
    'Find and rent your dream home easily with EzyRent. No stress, no hidden fees!',
  openGraph: {
    title: 'EzyRent - Rent Smarter, Live Easier',
    description:
      'Find and rent your dream home easily with EzyRent. No stress, no hidden fees!',
    images: [
      {
        url: 'https://www.ezyrent.org/images/preview.jpg',
        width: 1200,
        height: 630
      }
    ],
    url: 'https://www.ezyrent.org',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EzyRent - Rent Smarter, Live Easier',
    description:
      'Find and rent your dream home easily with EzyRent. No stress, no hidden fees!',
    images: ['https://www.ezyrent.org/images/preview.jpg']
  }
};
// export const metadata = generateMetadata({
//   title: 'Home',
//   description: 'Welcome to EzyRent',
//   path: ''
// });

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(dmSans.className, 'flex flex-col min-h-screen bg-white')}
      >
        <GoogleOAuthProvider clientId="214122998362-8gc20qq486bsnigkugj7fh09du0dm9hm.apps.googleusercontent.com">
          <main>{children}</main>

          <Toaster richColors />
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
