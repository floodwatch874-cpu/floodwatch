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
import {
  IconCurrentLocation,
  IconMinus,
  IconPlus,
  IconStack2,
} from '@tabler/icons-react';
import AffectedLocationsDrawer from '@/components/map/affected-locations-drawer';

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
  const interactiveMapRef = useRef<InteractiveMapHandle>(null);

  return (
    <MapProvider>
      <div className="relative w-full h-full">
        <InteractiveMap
          ref={interactiveMapRef}
          selectedLocation={selectedLocation}
          onSelectReport={setSelectedReport}
        />

        {/* Top bar: search + controls in one row */}
        <div className="absolute top-0 left-0 right-0 flex items-start gap-4 pointer-events-none h-full">
          {/* Search bar + affected panel share the left flex slot */}
          <div className="pointer-events-none flex-1 min-w-0 flex items-start h-full">
            {selectedReport && (
              <>
                <div className="hidden lg:flex flex-col h-full">
                  <AffectedLocationsPanel
                    report={selectedReport}
                    onClose={() => setSelectedReport(null)}
                  />
                </div>
                <div className="flex lg:hidden flex-col h-full">
                  <AffectedLocationsDrawer
                    report={selectedReport}
                    onClose={() => setSelectedReport(null)}
                  />
                </div>
              </>
            )}
            <div className="flex-1 w-lg sm:flex-none max-w-sm ps-4 pt-4">
              <SearchBar onSelectLocation={setSelectedLocation} />
            </div>
          </div>

          {/* Map controls — fixed to right */}
          <div className="pointer-events-none flex flex-col gap-2 h-fit pt-4 pe-4">
            {/* zoom buttons */}
            <div className="flex flex-col bg-white/80 rounded-md shadow-lg p-0.5 pointer-events-auto">
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

            {/* geolocate */}
            <div className="flex flex-col bg-white/80 rounded-md shadow-lg p-0.5 pointer-events-auto">
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

            {/* toggle legend */}
            <div className="relative flex flex-col bg-white/80 rounded-md shadow-lg p-0.5 pointer-events-auto">
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

          {activePanel && (
            <div
              className="absolute z-10 flex gap-4
              inset-0 md:inset-auto md:top-0 md:right-0 md:p-4"
            >
              {activePanel === 'notification' && <NotificationPanel />}
              {activePanel === 'profile' && <ProfilePanel />}
            </div>
          )}
        </div>

        <Suspense fallback={null}>
          <GoogleLinkToastHandler />
        </Suspense>
      </div>
    </MapProvider>
  );
}
