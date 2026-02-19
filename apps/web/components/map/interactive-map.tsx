'use client';

import { useEffect, useRef } from 'react';
import Map, { Marker, type MapRef } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';

type SelectedLocation = {
  longitude: number;
  latitude: number;
  label: string;
};

//Mock data
export type FloodSeverity = 'Low' | 'Medium' | 'High' | 'Critical';
export type FloodStatus = 'Pending' | 'Verified' | 'Resolved';

export type MockFloodReport = {
  id: string;
  longitude: number;
  latitude: number;
  locationName: string;
  severity: FloodSeverity;
  description: string;
  reportedAt: string; // ISO string
  status: FloodStatus;
};
//end

//function helper for color
function severityPinClass(severity: 'Low' | 'Medium' | 'High' | 'Critical') {
  if (severity === 'High') return 'bg-[#FF6900] border-t-[#FF6900]';
  if (severity === 'Medium') return 'bg-[#F0B204] border-t-[#F0B204]';
  if (severity === 'Critical') return 'bg-[#FB2C36] border-t-[#FB2C36]';
  return 'bg-[#2B7FFF] border-t-[#2B7FFF]';
}

export default function InteractiveMap({
  selectedLocation,
  mapId = 'main-map',
  reports = [], //added
  onSelectReport, //added
}: {
  selectedLocation?: SelectedLocation | null;
  mapId?: string; //added
  reports?: MockFloodReport[]; //added
  onSelectReport?: (report: MockFloodReport) => void; //added
}) {
  const mapRef = useRef<MapRef | null>(null);

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

  const handleReportClick = (report: MockFloodReport) => {
    onSelectReport?.(report);

    // Optional: also fly to the report pin when clicked
    const map = mapRef.current;
    if (!map) return;

    const currentZoom = typeof map.getZoom === 'function' ? map.getZoom() : 0;

    map.flyTo({
      center: [report.longitude, report.latitude],
      zoom: Math.max(currentZoom, 16),
      essential: true,
    });
  };

  return (
    <Map
      id={mapId}
      ref={mapRef}
      initialViewState={{
        // Center around Metro Manila area (so your sample pins are visible)
        longitude: 121.03,
        latitude: 14.62,
        zoom: 12.8,
      }}
      mapStyle="https://tiles.openfreemap.org/styles/bright"
    >
      {/* ✅ Mock report pins */}
      {reports.map((report) => {
        // ✅ ADDED: determine pin color based on severity
        const pinClass = severityPinClass(report.severity);

        // ✅ ADDED: split the returned string into circle color + triangle color
        const [circleClass, triangleClass] = pinClass.split(' ');

        return (
          <Marker
            key={report.id}
            longitude={report.longitude}
            latitude={report.latitude}
            anchor="bottom"
          >
            <button
              type="button"
              onClick={() => handleReportClick(report)}
              className="relative"
              title={report.locationName}
              aria-label={`Flood report pin: ${report.locationName}`}
            >
              {/* ✅ CHANGED: Visible pin color now depends on severity */}
              <div className={`h-5 w-5 rounded-full shadow-md ${circleClass}`} />

              {/* ✅ CHANGED: Triangle also matches severity color */}
              <div
                className={`mx-auto -mt-1 h-0 w-0 border-x-8 border-x-transparent border-t-12 ${triangleClass}`}
              />
            </button>
          </Marker>
        );
      })}

      {/* ✅ Search-selected location pin (red) */}
      {selectedLocation && (
        <Marker
          longitude={selectedLocation.longitude}
          latitude={selectedLocation.latitude}
          anchor="bottom"
        >
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
