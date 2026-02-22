'use client';

import SearchBar from '@/components/map/search-bar';
import MapLegend from '@/components/map/map-legend';
import InteractiveMap from '@/components/map/interactive-map';
import { Suspense, useEffect, useState } from 'react';
import ProfilePanel from '@/components/map/profile-panel';
import { usePanel } from '@/contexts/panel-context';
import FloatingActionButtonMenu from '@/components/map/floating-action-button-menu';
import AffectedLocationPopup from '@/components/map/affected-locations-popup';
import SafetyLocationsPopup from '@/components/map/safety-locations-popup';
import NotificationPanel from '@/components/map/notification-panel';
import HotlinesPopup from '@/components/map/hotlines-popup';
import { GoogleLinkToastHandler } from '@/components/google-link-toast-handler';
import { MapProvider } from 'react-map-gl/maplibre';
import AffectedLocationsPanel from '@/components/map/affected-locations-panel';
import { apiFetchClient } from '@/lib/api-fetch-client';
import { FloodReportsDto } from '@repo/schemas';
import { BoundaryProvider } from '@/contexts/boundary-context';

export type SelectedLocation = {
  longitude: number;
  latitude: number;
  label: string;
  source?: 'nominatim' | 'custom';
};

export default function InteractiveMapPage() {
  const [selectedLocation, setSelectedLocation] =
    useState<SelectedLocation | null>(null);
  const [selectedReport, setSelectedReport] = useState<FloodReportsDto | null>(
    null,
  );
  const [activePopup, setActivePopup] = useState<
    'affected' | 'safety' | 'hotlines' | null
  >(null);
  const [showLegend, setShowLegend] = useState(false);
  const { activePanel } = usePanel();
  const togglePopup = (popup: 'affected' | 'safety' | 'hotlines') => {
    setActivePopup(activePopup === popup ? null : popup);
  };
  const [reports, setReports] = useState<FloodReportsDto[]>([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await apiFetchClient('/reports', { method: 'GET' });
        const data = await res.json();
        setReports(data);
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    };

    fetchReports();
  }, []);

  return (
    <BoundaryProvider>
      <MapProvider>
        <div className="relative w-full h-full">
          <Suspense fallback={null}>
            <GoogleLinkToastHandler />
          </Suspense>

          <div className="absolute flex justify-center top-0 left-0 w-full h-full p-4 z-10 max-w-lg min-h-0">
            <SearchBar
              toggleLegend={() => setShowLegend(!showLegend)}
              onSelectLocation={setSelectedLocation}
            />

            {selectedReport && (
              <AffectedLocationsPanel
                report={selectedReport}
                onClose={() => setSelectedReport(null)}
              />
            )}
          </div>

          <div className="absolute top-4 right-4 z-10 flex gap-4 h-full">
            <div className="flex flex-col gap-4">
              <div className="flex gap-4 justify-end">
                <MapLegend show={showLegend} />
                <FloatingActionButtonMenu
                  toggleAffectedLocations={() => togglePopup('affected')}
                  toggleSafetyLocations={() => togglePopup('safety')}
                  toggleHotlines={() => togglePopup('hotlines')}
                  // ADDED: sets your selectedLocation, so the map flies + shows red pin
                  onUseCurrentLocation={({ latitude, longitude }) => {
                    setSelectedLocation({
                      latitude,
                      longitude,
                      label: 'My Current Location',
                      source: 'custom',
                    });
                  }}
                />
              </div>

              <div className="flex justify-end">
                <AffectedLocationPopup
                  show={activePopup === 'affected'}
                  onClose={() => setActivePopup(null)}
                />
                <SafetyLocationsPopup
                  show={activePopup === 'safety'}
                  onClose={() => setActivePopup(null)}
                />
                <HotlinesPopup
                  show={activePopup === 'hotlines'}
                  onClose={() => setActivePopup(null)}
                />
              </div>
            </div>

            {activePanel === 'notification' && <NotificationPanel />}
            {activePanel === 'profile' && <ProfilePanel />}
          </div>

          <InteractiveMap
            selectedLocation={selectedLocation}
            reports={reports}
            onSelectReport={setSelectedReport}
          />
        </div>
      </MapProvider>
    </BoundaryProvider>
  );
}
