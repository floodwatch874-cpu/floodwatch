'use client';

import { useEffect, useRef } from 'react';
import Map, { Marker, type MapRef } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';

type SelectedLocation = {
  longitude: number;
  latitude: number;
  label: string;
};

export default function InteractiveMap({
  selectedLocation,
}: {
  selectedLocation?: SelectedLocation | null;
}) {
  const mapRef = useRef<MapRef | null>(null);

  useEffect(() => {
    const loc = selectedLocation;
    const map = mapRef.current;
    if (!loc || !map) return;

    const currentZoom = typeof map.getZoom === 'function' ? map.getZoom() : 0;

    map.flyTo({
      center: [loc.longitude, loc.latitude],
      zoom: Math.max(currentZoom, 16),
      essential: true,
    });
  }, [selectedLocation]);

  return (
    <Map
      id="main-map"
      ref={mapRef}
      initialViewState={{
        longitude: 121.030909,
        latitude: 14.754587,
        zoom: 20,
      }}
      mapStyle="https://tiles.openfreemap.org/styles/bright"
    >
      {selectedLocation && (
        <Marker
          longitude={selectedLocation.longitude}
          latitude={selectedLocation.latitude}
          anchor="bottom"
        >
          {/* Simple visible pin */}
          <div
            title={selectedLocation.label}
            className="relative"
            aria-label="Selected location pin"
          >
            <div className="h-6 w-6 rounded-full bg-[#2B7FFF] shadow-md" />
            <div className="mx-auto -mt-1 h-0 w-0 border-x-8 border-x-transparent border-t-12 border-t-[#2B7FFF]" />
          </div>
        </Marker>
      )}
    </Map>
  );
}
