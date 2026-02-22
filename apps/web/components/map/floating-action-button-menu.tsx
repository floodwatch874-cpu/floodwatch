'use client';

import { Button } from '@/components/ui/button';
import {
  IconAlertTriangle,
  IconCurrentLocation,
  IconPhoneCall,
  IconShieldCheck,
} from '@tabler/icons-react';
import { getUserLocation } from '@/lib/utils/get-user-location';
import ReportFloodAlertModal from './report-flood-alert-modal';

export default function FloatingActionButtonMenu({
  toggleAffectedLocations,
  toggleSafetyLocations,
  toggleHotlines,

  // ✅ ADDED
  onUseCurrentLocation,
}: {
  toggleAffectedLocations: () => void;
  toggleSafetyLocations: () => void;
  toggleHotlines: () => void;

  // To get Current Location
  onUseCurrentLocation: (coords: {
    latitude: number;
    longitude: number;
  }) => void;
}) {
  const handleLocationClick = async () => {
    try {
      const { longitude, latitude } = await getUserLocation();

      // Changed in getting current location
      onUseCurrentLocation({ latitude, longitude });
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to get location');
    }
  };

  return (
    <div className="flex flex-col bg-white text-sm rounded-xl shadow-lg h-fit w-fit p-4">
      <div className="flex flex-col gap-4">
        <Button
          variant="ghost"
          className="flex items-center gap-2 justify-start"
          onClick={toggleSafetyLocations}
        >
          <IconShieldCheck className="w-[1.5em]! h-[1.5em]! text-[#0066CC]" />
          <span>Safety Locations</span>
        </Button>

        <Button
          variant="ghost"
          className="flex items-center gap-2 justify-start"
          onClick={toggleAffectedLocations}
        >
          <IconAlertTriangle className="w-[1.5em]! h-[1.5em]! text-[#FB2C36]" />
          <span>Affected Locations</span>
        </Button>

        <Button
          variant="ghost"
          className="flex items-center gap-2 justify-start"
          onClick={handleLocationClick}
        >
          <IconCurrentLocation className="w-[1.5em]! h-[1.5em]! text-[#3182FF]" />
          <span>Location</span>
        </Button>

        <ReportFloodAlertModal />

        <Button
          variant="ghost"
          className="flex items-center gap-2 justify-start"
          onClick={toggleHotlines}
        >
          <IconPhoneCall className="w-[1.5em]! h-[1.5em]! text-[#FF6900]" />
          <span>Hotlines</span>
        </Button>
      </div>
    </div>
  );
}
