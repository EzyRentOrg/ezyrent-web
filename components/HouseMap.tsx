import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, TileLayer, Tooltip } from 'react-leaflet';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet/dist/leaflet.css';

export default function HouseMap({ address }: { address?: string }) {
  const [coordinates, setCoordinates] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCoordinates = async () => {
      if (!address) {
        setError('No address provided.');
        setLoading(false);
        return;
      }

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
      } finally {
        setLoading(false);
      }
    };

    fetchCoordinates();
  }, [address]);

  if (loading) {
    return <p>Loading map...</p>;
  }

  if (error) {
    return (
      <div className="text-red-500">
        <p>Error: {error}</p>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  if (!coordinates) {
    return <p>No coordinates available.</p>;
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
        <Tooltip direction="top" permanent>
          {address}
        </Tooltip>
      </Marker>
    </MapContainer>
  );
}
