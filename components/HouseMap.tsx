import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, Tooltip } from 'react-leaflet';
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"
import 'leaflet/dist/leaflet.css';

export default function HouseMap({ address }: { address?: string }) {
  const [coordinates, setCoordinates] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCoordinates = async () => {
      if (!address) return;

      try {
        const apiKey = process.env.NEXT_PUBLIC_LOCATION_HQTRS_API_KEY;
        if (!apiKey) {
          throw new Error('API key is not configured.');
        }

        const response = await fetch(
          `https://us1.locationiq.com/v1/search?key=${apiKey}&q=${encodeURIComponent(address)}&format=json`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch location data.');
        }

        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          const { lat, lon } = data[0];
          setCoordinates({ lat: parseFloat(lat), lng: parseFloat(lon) });
        } else {
          setError('No location found for the given address.');
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'An unknown error occurred.'
        );
      }
    };

    fetchCoordinates();
  }, [address]);

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  if (!coordinates) {
    return ;
  }

  return (
    <MapContainer
      center={[coordinates.lat, coordinates.lng]}
      zoom={15}
      scrollWheelZoom={false}
      className="w-full h-[500px] lg:h-[600px] relative"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[coordinates.lat, coordinates.lng]}>
        <Tooltip direction="top" permanent={true}>
          {address}
        </Tooltip>
      </Marker>
    </MapContainer>
  );
}
