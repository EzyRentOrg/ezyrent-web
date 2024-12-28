import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { MapPin } from 'lucide-react';

// Fix the marker icon issue
delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: () => void })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src
});

interface HouseMapProps {
  address?: string;
}

export default function HouseMap({ address }: HouseMapProps) {
  const [coordinates, setCoordinates] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCoordinates = async () => {
      if (!address) return;

      try {
        const apiKey = process.env.LOCATION_HQTRS_API_KEY;
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
        if (data && data.length > 0) {
          const { lat, lon } = data[0];
          setCoordinates({ lat: parseFloat(lat), lng: parseFloat(lon) });
        } else {
          setError('No location found for the given address.');
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred.');
        }
      }
    };

    fetchCoordinates();
  }, [address]);

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  if (!coordinates) {
    return <p className="text-gray-500">Loading map...</p>;
  }

  return (
    
      <MapContainer
        center={[coordinates.lat, coordinates.lng]}
        zoom={15}
        scrollWheelZoom={false}
        className="w-full h-[500px] lg:h-[600px] relative"
      >
        <div className="absolute z-[999] top-5 right-0 h-fit text-sm font-semibold py-1 px-[10px] bg-[#f1f1f1] text-[#000929] flex items-center">
          <MapPin size={20} className="mr-2" />
          {address}
        </div>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[coordinates.lat, coordinates.lng]}>
          <Popup>{address}</Popup>
        </Marker>
      </MapContainer>
    
  );
}
