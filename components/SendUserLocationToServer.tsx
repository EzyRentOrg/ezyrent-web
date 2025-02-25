'use client';

import { useEffect } from 'react';

interface Location {
  latitude: number;
  longitude: number;
}

export default function SendUserLocationToBackend({
  location
}: {
  location: Location;
}) {
  useEffect(() => {
    const sendLocation = async () => {
      try {
        const response = await fetch('/api/send-location', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(location)
        });

        if (!response.ok) {
          throw new Error('Failed to send location to the backend');
        }

        const data = await response.json();
        console.log('Backend response:', data);
      } catch (error) {
        console.error('Error sending location:', error);
      }
    };

    sendLocation();
  }, [location]);

  return null;
}
