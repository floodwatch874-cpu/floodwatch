'use client';

import { useEffect } from 'react';
import { useMap } from 'react-map-gl/maplibre';
import circle from '@turf/circle';

const SEVERITY_COLOR_MAP: Record<string, string> = {
  critical: '#FB2C36',
  high: '#FF6900',
  moderate: '#F0B204',
  low: '#2B7FFF',
};

export default function RadiusCircle({
  longitude,
  latitude,
  range,
  severity,
  id = 'radius-circle',
}: {
  longitude: number;
  latitude: number;
  range: number;
  severity: 'critical' | 'high' | 'moderate' | 'low';
  id?: string;
}) {
  const { current: map } = useMap();

  useEffect(() => {
    if (!map) return;
    const nativeMap = map.getMap();

    const circleGeoJSON = circle([longitude, latitude], range, {
      steps: 64,
      units: 'meters',
    });
    const color = SEVERITY_COLOR_MAP[severity] ?? SEVERITY_COLOR_MAP.low;

    const setup = () => {
      // Teardown first to avoid "already exists" errors on hot reload / StrictMode
      if (nativeMap.getLayer(`${id}-fill`)) nativeMap.removeLayer(`${id}-fill`);
      if (nativeMap.getLayer(`${id}-outline`))
        nativeMap.removeLayer(`${id}-outline`);
      if (nativeMap.getSource(id)) nativeMap.removeSource(id);

      nativeMap.addSource(id, {
        type: 'geojson',
        data: circleGeoJSON,
      });

      nativeMap.addLayer({
        id: `${id}-fill`,
        type: 'fill',
        source: id,
        layout: {},
        paint: {
          'fill-color': color,
          'fill-opacity': 0.2,
        },
      });

      nativeMap.addLayer({
        id: `${id}-outline`,
        type: 'line',
        source: id,
        layout: {},
        paint: {
          'line-color': color,
          'line-width': 2,
          'line-dasharray': [4, 2],
        },
      });
    };

    if (nativeMap.isStyleLoaded()) {
      setup();
    } else {
      nativeMap.once('load', setup);
    }

    return () => {
      nativeMap.off('load', setup);
      try {
        if (!nativeMap.getStyle()) return; // If style is not loaded, layers/sources won't exist
        if (nativeMap.getLayer(`${id}-fill`))
          nativeMap.removeLayer(`${id}-fill`);
        if (nativeMap.getLayer(`${id}-outline`))
          nativeMap.removeLayer(`${id}-outline`);
        if (nativeMap.getSource(id)) nativeMap.removeSource(id);
      } catch {}
    };
  }, [map, id, longitude, latitude, range, severity]);

  return null;
}
