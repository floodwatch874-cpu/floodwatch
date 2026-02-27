'use client';

import { Layer, Map, Marker, Source } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import RadiusCircle from '@/components/shared/radius-circle';
import { Spinner } from '@/components/ui/spinner';
import { useBoundary } from '@/hooks/use-boundary';
import { FloodMarker } from '../markers/flood-marker';

export default function InteractiveMapReportedLocation({
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
      </div>
    );
  }

  return (
    <Map
      initialViewState={{
        longitude: longitude,
        latitude: latitude,
        zoom: 13.5,
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
        anchor="bottom"
      >
        <FloodMarker severity={severity} />
      </Marker>
    </Map>
  );
}
