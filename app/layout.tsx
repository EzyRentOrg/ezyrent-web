import { dmSans } from '@/lib/font';
import { cn } from '@/lib/utils';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Toaster } from 'sonner';
import { generateMetadata } from '@/lib/metadata';
import './globals.css';

export const metadata = generateMetadata({
  title: 'Home',
  description: 'Welcome to EzyRent',
  path: ''
});

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
