import AffectedLocationsCard from '@/components/admin/map/affected-locations-card';
import Pagination from '@/components/admin/map/map-pagination';
import { ScrollArea } from '@/components/ui/scroll-area';
import CreateFloodAlertModal from './create-flood-alert-modal';

export default function AffectedLocationsTab() {
  return (
    <>
      <CreateFloodAlertModal />
      <div className="flex-1 flex flex-col rounded-2xl border min-h-0">
        <div className="flex-1 overflow-hidden min-h-0">
          <ScrollArea className="h-full p-4">
            <div className="space-y-4 pr-4">
              <AffectedLocationsCard
                severity="critical"
                location="Barangay 176"
                message="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Suscipit ut quaerat a ipsa maxime omnis facilis impedit! Vero aut modi possimus sapiente illo dolores corporis ipsum, perspiciatis placeat enim iure?"
                reportedAt="2026-01-28T10:30:00Z"
              />
              <AffectedLocationsCard
                severity="high"
                location="Barangay 42"
                message="Floodwaters reaching waist level, residents advised to evacuate immediately."
                reportedAt="2026-01-27T08:15:00Z"
              />
              <AffectedLocationsCard
                severity="moderate"
                location="Barangay 89"
                message="Rising floodwaters, residents urged to stay alert and monitor updates."
                reportedAt="2026-01-26T14:45:00Z"
              />
              <AffectedLocationsCard
                severity="low"
                location="Barangay 23"
                message="Minor flooding reported, residents advised to exercise caution."
                reportedAt="2026-01-25T09:00:00Z"
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
