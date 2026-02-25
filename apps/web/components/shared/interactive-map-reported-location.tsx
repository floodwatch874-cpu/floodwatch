'use client';

import { Map, Marker } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import RadiusCircle from '@/components/shared/radius-circle';
import { Spinner } from '@/components/ui/spinner';
import { SEVERITY_COLOR_MAP } from '@/lib/utils/get-color-map';

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
