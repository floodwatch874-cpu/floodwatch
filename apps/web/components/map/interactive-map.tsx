'use client';

import { Fragment, useEffect, useRef } from 'react';
import Map, { Layer, Marker, Source, type MapRef } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { ReportsDto } from '@repo/schemas';
import { SEVERITY_COLOR_MAP } from '@/lib/utils/get-color-map';
import RadiusCircle from '@/components/radius-circle';
import { useBoundary } from '@/contexts/boundary-context';

type SelectedLocation = {
  longitude: number;
  latitude: number;
  label: string;
};

export default function InteractiveMap({
  selectedLocation,
  reports,
  onSelectReport,
}: {
  selectedLocation?: SelectedLocation | null;
  reports: ReportsDto[];
  onSelectReport: (report: ReportsDto) => void;
}) {
  const mapRef = useRef<MapRef | null>(null);
  const { caloocanGeoJSON, caloocanOutlineGeoJSON } = useBoundary();

  // When user searches a location, fly to it
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

  const handleSelectReport = (report: ReportsDto) => {
    mapRef?.current?.flyTo({
      center: [report.longitude, report.latitude],
      zoom: Math.max(mapRef?.current.getZoom(), 16),
      essential: true,
    });
    onSelectReport(report);
  };

  return (
    <Map
      id="interactive-map"
      ref={mapRef}
      initialViewState={{
        // Center around Metro Manila area (so your sample pins are visible)
        latitude: 14.69906,
        longitude: 120.99772,
        zoom: 11.5,
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

      {/* Flood report pins */}
      {reports.map((report) => (
        <Fragment key={report.id}>
          <Marker
            key={report.id}
            longitude={report.longitude}
            latitude={report.latitude}
            color={SEVERITY_COLOR_MAP[report.severity]}
            onClick={() => handleSelectReport(report)}
          />
          <RadiusCircle
            id={`${report.id}`}
            longitude={report.longitude}
            latitude={report.latitude}
            range={report.range}
            severity={report.severity}
          />
        </Fragment>
      ))}

      {/* Search-selected location pin (red) */}
      {selectedLocation && (
        <Marker
          longitude={selectedLocation.longitude}
          latitude={selectedLocation.latitude}
          color="#FF0000"
        />
      )}
    </Map>
  );
}
