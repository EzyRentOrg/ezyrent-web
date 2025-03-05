'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction
} from '@/components/ui/alert-dialog';

export default function ClientCheckForToken() {
  const router = useRouter();
  const pathname = usePathname();
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch('/api/admin/check-session');
        const data = await response.json();

        if (!data.success) {
          setShowAlert(true); // Show alert if session is expired
        }
      } catch (error) {
        console.error('Error checking session:', error);
      }
    };

    // Check session immediately on mount
    checkSession();

    // Check session every 1 minute
    const intervalId = setInterval(checkSession, 60000);

    // Cleanup interval on unmount
    return () => clearInterval(intervalId);
  }, [router]);

  return (
    <AlertDialog open={showAlert}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Session Expired</AlertDialogTitle>
          <AlertDialogDescription>
            Your session has expired. Please log in again to continue.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={() => {
              // Redirect to login page with the current pathname as callbackUrl
              router.push(`/login?callbackUrl=${encodeURIComponent(pathname)}`);
            }}
          >
            Go to Login
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
