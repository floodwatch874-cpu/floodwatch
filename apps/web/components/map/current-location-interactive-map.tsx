'use client';

import { Layer, Map, Marker, Source } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { Spinner } from '@/components/ui/spinner';
import RadiusCircle from './radius-circle';
import { useBoundary } from '@/contexts/boundary-context';

const SEVERITY_COLOR_MAP: Record<string, string> = {
  critical: '#FB2C36',
  high: '#FF6900',
  moderate: '#F0B204',
  low: '#2B7FFF',
};

export default function InteractiveMap({
  longitude,
  latitude,
  range,
  severity,
}: {
  longitude: number | null;
  latitude: number | null;
  range: number;
  severity: 'critical' | 'high' | 'moderate' | 'low';
}) {
  const { caloocanGeoJSON, caloocanOutlineGeoJSON } = useBoundary();

  if (longitude === null || latitude === null) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-2">
        <Spinner className="size-16 text-[#0066CC]" />
        <span className="text-lg text-gray-600">Getting your location...</span>
      </div>
    );
  }

  return (
    <Map
      initialViewState={{
        longitude: longitude,
        latitude: latitude,
        zoom: 16,
      }}
      mapStyle="https://tiles.openfreemap.org/styles/bright"
    >
      {/* boundary fill */}
      {caloocanGeoJSON && (
        <Source id="caloocan" type="geojson" data={caloocanGeoJSON}>
          <Layer
            id="caloocan-fill"
            type="fill"
            paint={{
              'fill-color': '#0066CC',
              'fill-opacity': 0.05,
            }}
          />
        </Source>
      )}

      {/* boundary outline */}
      {caloocanOutlineGeoJSON && (
        <Source
          id="caloocan-outline"
          type="geojson"
          data={caloocanOutlineGeoJSON}
        >
          <Layer
            id="caloocan-outline-line"
            type="line"
            paint={{
              'line-color': '#0066CC',
              'line-width': 2,
            }}
          />
        </Source>
      )}

      <RadiusCircle
        longitude={longitude}
        latitude={latitude}
        range={range}
        severity={severity}
      />
      <Marker
        key={severity}
        longitude={longitude}
        latitude={latitude}
        color={SEVERITY_COLOR_MAP[severity]}
      />
    </Map>
  );
}
