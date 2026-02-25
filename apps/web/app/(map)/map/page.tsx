'use client';

import SearchBar from '@/components/map/search-bar';
import MapLegend from '@/components/map/map-legend';
import InteractiveMap, {
  InteractiveMapHandle,
} from '@/components/map/interactive-map';
import { Suspense, useRef, useState } from 'react';
import ProfilePanel from '@/components/map/profile-panel';
import { usePanel } from '@/contexts/panel-context';
import NotificationPanel from '@/components/map/notification-panel';
import { GoogleLinkToastHandler } from '@/components/shared/google-link-toast-handler';
import { MapProvider } from 'react-map-gl/maplibre';
import AffectedLocationsPanel from '@/components/map/affected-locations-panel';
import { ReportsDto } from '@repo/schemas';
import { BoundaryProvider } from '@/contexts/boundary-context';
import { useReports } from '@/hooks/use-reports';
import {
  IconCurrentLocation,
  IconMinus,
  IconPlus,
  IconStack2,
} from '@tabler/icons-react';

export type SelectedLocation = {
  longitude: number;
  latitude: number;
  label: string;
  source?: 'nominatim' | 'custom';
};

export default function InteractiveMapPage() {
  const [selectedLocation, setSelectedLocation] =
    useState<SelectedLocation | null>(null);
  const [selectedReport, setSelectedReport] = useState<ReportsDto | null>(null);
  const [showLegend, setShowLegend] = useState(false);
  const { activePanel } = usePanel();
  const { reports } = useReports();
  const interactiveMapRef = useRef<InteractiveMapHandle>(null);

  return (
    <BoundaryProvider>
      <MapProvider>
        <div className="relative w-full h-full">
          <InteractiveMap
            ref={interactiveMapRef}
            selectedLocation={selectedLocation}
            reports={reports}
            onSelectReport={setSelectedReport}
          />

          <div className="absolute flex flex-col top-4 right-4 z-1 w-fit gap-2 h-fit">
            <div className="flex flex-col bg-white/80 rounded-md shadow-lg p-0.5">
              <button
                onClick={() => interactiveMapRef.current?.zoomIn()}
                className="aspect-square hover:bg-gray-200 rounded-md p-1"
                title="Zoom In"
              >
                <IconPlus className="w-[1.5em]! h-[1.5em]!" strokeWidth={1.5} />
              </button>
              <button
                onClick={() => interactiveMapRef.current?.zoomOut()}
                className="aspect-square hover:bg-gray-200 rounded-md p-1"
                title="Zoom Out"
              >
                <IconMinus
                  className="w-[1.5em]! h-[1.5em]!"
                  strokeWidth={1.5}
                />
              </button>
            </div>

            <div className="flex flex-col bg-white/80 rounded-md shadow-lg p-0.5">
              <button
                onClick={() => interactiveMapRef.current?.geolocate()}
                className="aspect-square hover:bg-gray-200 rounded-md p-1"
                title="Geolocate"
              >
                <IconCurrentLocation
                  className="w-[1.5em]! h-[1.5em]!"
                  strokeWidth={1.5}
                />
              </button>
            </div>

            <div className="relative flex flex-col bg-white/80 rounded-md shadow-lg p-0.5">
              <button
                onClick={() => setShowLegend(!showLegend)}
                className="aspect-square hover:bg-gray-200 rounded-md p-1"
                title="Toggle Legend"
              >
                <IconStack2
                  className="w-[1.5em]! h-[1.5em]!"
                  strokeWidth={1.5}
                />
              </button>
              <div className="absolute top-full right-0 mt-2">
                <MapLegend show={showLegend} />
              </div>
            </div>
          </div>

          <div className="absolute flex top-0 left-0 w-full h-full z-10 min-h-0 pointer-events-none">
            {selectedReport && (
              <AffectedLocationsPanel
                report={selectedReport}
                onClose={() => setSelectedReport(null)}
              />
            )}
            <div className="ms-4 mt-4 max-w-lg w-full">
              <SearchBar onSelectLocation={setSelectedLocation} />
            </div>
          </div>

          <div className="absolute top-4 right-4 z-10 flex gap-4 h-full">
            {activePanel === 'notification' && <NotificationPanel />}
            {activePanel === 'profile' && <ProfilePanel />}
          </div>

          <Suspense fallback={null}>
            <GoogleLinkToastHandler />
          </Suspense>
        </div>
      </MapProvider>
    </BoundaryProvider>
  );
}
