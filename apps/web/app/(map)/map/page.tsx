'use client';

import SearchBar from '@/components/map/search-bar';
import MapLegend from '@/components/map/map-legend';
import InteractiveMap from '@/components/map/interactive-map';
import { Suspense, useState } from 'react';
import ProfilePanel from '@/components/map/profile-panel';
import { usePanel } from '@/contexts/panel-context';
import FloatingActionButtonMenu from '@/components/map/floating-action-button-menu';
import AffectedLocationPopup from '@/components/map/affected-locations-popup';
import SafetyLocationsPopup from '@/components/map/safety-locations-popup';
import NotificationPanel from '@/components/map/notification-panel';
import HotlinesPopup from '@/components/map/hotlines-popup';
import { GoogleLinkToastHandler } from '@/components/google-link-toast-handler';
import { MapProvider } from 'react-map-gl/maplibre';
import AffectedLocationPanel from '@/components/map/affected-location-panel';
import SafetyLocationPanel from '@/components/map/safety-location-panel';
import { ReportFloodAlertDialog } from '@/components/map/report-flood-dialog';

export type SelectedLocation = {
  longitude: number;
  latitude: number;
  label: string;
  source?: 'nominatim' | 'custom';
};

export default function InteractiveMapPage() {
  const [showLegend, setShowLegend] = useState(false);

  const [reportOpen, setReportOpen] = useState(false);

  // ✅ Shared state: search → map pin
  const [selectedLocation, setSelectedLocation] =
    useState<SelectedLocation | null>(null);

  const [activePopup, setActivePopup] = useState<
    'affected' | 'safety' | 'hotlines' | null
  >(null);

  const { activePanel } = usePanel();

  const togglePopup = (popup: 'affected' | 'safety' | 'hotlines') => {
    setActivePopup(activePopup === popup ? null : popup);
  };

  return (
    <MapProvider>
      <div className="relative w-full h-full">
        <Suspense fallback={null}>
          <GoogleLinkToastHandler />
        </Suspense>

        <SearchBar
          toggleLegend={() => setShowLegend(!showLegend)}
          onSelectLocation={setSelectedLocation}
        />

        <div className="absolute top-4 right-4 z-10 flex gap-4 h-full">
          <div className="flex flex-col gap-4">
            <div className="flex gap-4 justify-end">
              <MapLegend show={showLegend} />
              <FloatingActionButtonMenu
                toggleAffectedLocations={() => togglePopup('affected')}
                toggleSafetyLocations={() => togglePopup('safety')}
                toggleHotlines={() => togglePopup('hotlines')}
                openReportDialog={() => setReportOpen(true)}
                
                // ✅ ADDED: sets your selectedLocation, so the map flies + shows red pin
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
              <ReportFloodAlertDialog
                open={reportOpen}
                onOpenChange={setReportOpen}
              />
            </div>
          </div>

          {activePanel === 'notification' && <NotificationPanel />}
          {activePanel === 'profile' && <ProfilePanel />}
        </div>

        {/* <SafetyLocationPanel/> */}

        {/* <AffectedLocationPanel/> */}

        <InteractiveMap selectedLocation={selectedLocation} />
      </div>
    </MapProvider>
  );
}
