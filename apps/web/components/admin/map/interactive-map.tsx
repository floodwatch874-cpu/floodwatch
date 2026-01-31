'use client';

import Map from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';

export default function InteractiveMap() {
  return (
    <Map
      initialViewState={{
        longitude: 121.030909,
        latitude: 14.754587,
        zoom: 20,
      }}
      mapStyle="https://tiles.openfreemap.org/styles/bright"
    />
  );
}
