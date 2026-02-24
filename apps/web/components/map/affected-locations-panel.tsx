import { ReportsDto } from '@repo/schemas';
import Image from 'next/image';
import {
  IconArrowBearRight2,
  IconChevronLeft,
  IconCircleCheck,
  IconCircleDashed,
  IconClock,
  IconUsers,
} from '@tabler/icons-react';
import { formatDistanceToNow } from 'date-fns';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CommunityTab from '@/components/map/community-tab';
import DirectionTab from '@/components/map/direction-tab';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  REPORT_STATUS_COLOR_MAP,
  SEVERITY_COLOR_MAP,
} from '@/lib/utils/get-color-map';

export default function AffectedLocationsPanel({
  report,
  onClose,
}: {
  report: ReportsDto;
  onClose?: () => void;
}) {
  return (
    <div className="relative w-full h-full bg-white z-50 min-h-0 flex flex-col max-w-lg pointer-events-auto">
      <button
        className="absolute bg-white top-1/2 translate-x-full right-0 h-16 -translate-y-1/2 
        rounded-r-2xl ps-1 py-1 pr-1.5 text-xs z-30 shadow-[4px_0px_6px_-1px_rgba(0,0,0,0.1)]"
        onClick={onClose}
      >
        <IconChevronLeft className="w-[1.5em]! h-[1.5em]!" />
      </button>
      <ScrollArea className="relative w-full h-full overflow-visible z-50">
        <div className="aspect-video w-full relative bg-muted shrink-0">
          {report?.image ? (
            <Image
              src={report.image}
              alt="Affected location"
              fill
              className="object-cover"
            />
          ) : (
            <Image
              src="/no-data-rafiki.svg"
              alt="No image available"
              fill
              className="object-cover opacity-40"
            />
          )}
        </div>
        <div
          className="flex flex-col p-4 gap-4 border-l-4 shrink-0"
          style={{ borderLeftColor: SEVERITY_COLOR_MAP[report?.severity] }}
        >
          {/* row 1 */}
          <h3 className="font-poppins text-lg font-semibold">
            {report?.location}
          </h3>

          {/* row 3 */}
          <div className="flex flex-row justify-between gap-4">
            {/* reported at */}
            <div className="flex items-center text-sm gap-2 text-gray-600">
              <IconClock className="w-[1.5em]! h-[1.5em]!" />
              {formatDistanceToNow(new Date(report?.reportedAt), {
                addSuffix: true,
              })}
            </div>

            {/* severity level */}
            <div className="flex items-center gap-2 text-gray-600">
              <span className="text-sm">Severity Level:</span>
              <div
                className="flex items-center rounded-full px-3 py-1"
                style={{
                  color: SEVERITY_COLOR_MAP[report?.severity],
                  backgroundColor: `${SEVERITY_COLOR_MAP[report?.severity]}25`,
                }}
              >
                <span className="text-xs font-medium">
                  {report?.severity?.toUpperCase()}
                </span>
              </div>
            </div>
          </div>

          {/* row 4 */}
          <div className="flex flex-row justify-between gap-4">
            {/* reported by */}
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <span className="">Reported by:</span>
              <span className="font-medium">{report?.reporter?.name}</span>
            </div>

            <div
              className="flex items-center rounded-full px-3 py-1 w-fit"
              style={{
                color: REPORT_STATUS_COLOR_MAP[report?.status],
                backgroundColor: `${REPORT_STATUS_COLOR_MAP[report?.status]}25`,
              }}
            >
              <div className="flex items-center gap-2 text-xs">
                {report?.status === 'verified' ? (
                  <IconCircleCheck className="w-[1.5em]! h-[1.5em]!" />
                ) : (
                  <IconCircleDashed className="w-[1.5em]! h-[1.5em]!" />
                )}
                <span className="flex items-center font-medium">
                  {report?.status.toUpperCase()} REPORT
                </span>
              </div>
            </div>
          </div>
        </div>
        <Tabs
          defaultValue="direction"
          className="flex-1 flex flex-col h-full min-h-0 pt-4"
        >
          <div className="w-full border-b shrink-0">
            <TabsList variant="line" className="font-poppins w-full">
              <TabsTrigger
                value="direction"
                className="data-[state=active]:text-[#0066CC] 
                data-[state=active]:after:bg-[#0066CC] text-base"
              >
                <IconArrowBearRight2 />
                Direction
              </TabsTrigger>
              <TabsTrigger
                value="community"
                className="data-[state=active]:text-[#0066CC] 
                data-[state=active]:after:bg-[#0066CC] text-base"
              >
                <IconUsers />
                Community
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent
            value="direction"
            className="flex-1 flex flex-col min-h-0 p-4"
          >
            <DirectionTab report={report} />
          </TabsContent>
          <TabsContent
            value="community"
            className="flex-1 flex flex-col min-h-0 p-4"
          >
            <CommunityTab />
          </TabsContent>
        </Tabs>
      </ScrollArea>
    </div>
  );
}
