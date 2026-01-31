import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AffectedLocationsTab from '@/components/admin/map/affected-locations-tab';
import SafeZoneTab from '@/components/admin/map/safe-zone-tab';

export default function MapRight() {
  return (
    <div className="flex-1 min-h-0 rounded-2xl overflow-hidden">
      <Tabs
        defaultValue="affected"
        className="flex-1 flex flex-col h-full min-h-0"
      >
        <TabsList className="w-full bg-[#EFF6FF] py-7 px-1.5 space-x-1.5">
          <TabsTrigger
            value="affected"
            className="data-[state=active]:bg-[#0066CC] data-[state=active]:text-white hover:bg-[#DBEAFE] py-5"
          >
            Affected Locations
          </TabsTrigger>
          <TabsTrigger
            value="safe"
            className="data-[state=active]:bg-[#0066CC] data-[state=active]:text-white hover:bg-[#DBEAFE] py-5"
          >
            Safe Zone
          </TabsTrigger>
        </TabsList>

        {/* Affected Location */}
        <TabsContent
          value="affected"
          className="flex-1 flex flex-col space-y-2 min-h-0"
        >
          <AffectedLocationsTab />
        </TabsContent>

        {/* Safe Zone */}
        <TabsContent
          value="safe"
          className="flex-1 flex flex-col space-y-2 min-h-0"
        >
          <SafeZoneTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
