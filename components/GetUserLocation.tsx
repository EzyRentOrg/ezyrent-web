'use client';

import { useEffect, useState } from 'react';
import SendUserLocationToBackend from './SendUserLocationToServer';

interface Location {
  latitude: number;
  longitude: number;
}

export default function GetUserLocation() {
  const [location, setLocation] = useState<Location | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        if (!response.ok) {
          throw new Error('Failed to fetch location data');
        }
        const data = await response.json();
        setLocation({
          latitude: data.latitude,
          longitude: data.longitude
        });
      } catch (error) {
        setError('Unable to fetch location. Please try again later.');
        console.error('Error fetching location:', error);
      }
    };

    fetchLocation();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!location) {
    return <div>Loading location...</div>;
  }

  return (
    <div>
      <div>
        <p>Latitude: {location.latitude}</p>
        <p>Longitude: {location.longitude}</p>
      </div>
      <SendUserLocationToBackend location={location} />
    </div>
  );
}
