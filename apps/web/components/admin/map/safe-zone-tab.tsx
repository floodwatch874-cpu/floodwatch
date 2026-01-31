import { ScrollArea } from '@/components/ui/scroll-area';
import Pagination from '@/components/admin/map/map-pagination';
import SafeZoneCard from '@/components/admin/map/safe-zone-card';
import CreateSafeZoneModal from './create-safe-zone-modal';

export default function SafeZoneTab() {
  return (
    <>
      <CreateSafeZoneModal />
      <div className="flex-1 flex flex-col rounded-2xl border min-h-0">
        <div className="flex-1 overflow-hidden min-h-0">
          <ScrollArea className="h-full p-4">
            <div className="space-y-4 pr-4">
              <SafeZoneCard
                name="Community Safe Haven"
                address="123 Safety St, Safeville"
                availability="Open 24/7"
              />
              <SafeZoneCard
                name="Downtown Shelter"
                address="456 Help Ave, Caretown"
                availability="Mon-Fri 9am-5pm"
              />
              <SafeZoneCard
                name="Neighborhood Refuge"
                address="789 Support Rd, Kindcity"
                availability="Open 24/7"
              />
              <SafeZoneCard
                name="City Aid Center"
                address="101 Relief Blvd, Hopeville"
                availability="Mon-Sun 8am-8pm"
              />
              <SafeZoneCard
                name="Urban Safe Spot"
                address="202 Protection Ln, Securetown"
                availability="Open 24/7"
              />
              <SafeZoneCard
                name="Harbor Shelter"
                address="303 Sanctuary St, Havenport"
                availability="Mon-Fri 10am-6pm"
              />
            </div>
          </ScrollArea>
        </div>

        <div className="mt-auto border-t p-2 rounded-b-2xl">
          <Pagination />
        </div>
      </div>
    </>
  );
}
