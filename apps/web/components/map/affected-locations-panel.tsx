import { useEffect, useRef } from 'react';

import { ReportsDto } from '@repo/schemas';
import Image from 'next/image';
import {
  IconChevronLeft,
  IconCircleCheck,
  IconCircleDashed,
  IconClock,
  IconMessageCircle,
} from '@tabler/icons-react';
import { formatDistanceToNow } from 'date-fns';

import {
  REPORT_STATUS_COLOR_MAP,
  SEVERITY_COLOR_MAP,
} from '@/lib/utils/get-color-map';
import PostComposer from '@/components/shared/post-composer';
import PostCard from '@/components/shared/post-card';

export default function AffectedLocationsPanel({
  report,
  onClose,
}: {
  report: ReportsDto;
  onClose?: () => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // scroll to top when report changes
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [report?.id]);

  return (
    <div className="relative w-full h-full bg-white z-50 min-h-0 flex flex-col max-w-lg pointer-events-auto">
      <button
        className="absolute bg-white top-1/2 translate-x-full right-0 h-16 -translate-y-1/2 
        rounded-r-2xl ps-1 py-1 pr-1.5 text-xs z-30 shadow-[4px_0px_6px_-1px_rgba(0,0,0,0.1)]"
        onClick={onClose}
      >
        <IconChevronLeft className="w-[1.5em]! h-[1.5em]!" />
      </button>
      <div className="flex-1 min-h-0 overflow-y-auto">
        <div className="aspect-video w-full relative bg-muted shrink-0 ">
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

          {/* row 2 */}
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
              <span className="font-poppins text-sm">SEVERITY LEVEL:</span>
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

          {/* row 3 */}
          <div className="flex flex-row justify-between gap-4">
            {/* reported by */}
            <div className="flex flex-col text-gray-600 text-sm">
              <span className="font-poppins font-medium">REPORTED BY:</span>
              <span>{report?.reporter?.name}</span>
            </div>

            <div
              className="flex items-center rounded-full px-3 py-1 w-fit h-fit"
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

        {/* label */}
        <div className="flex items-center gap-2 p-4 border-y text-lg">
          <IconMessageCircle className="w-[1.5em]! h-[1.5em]!" />
          <span className="font-poppins font-medium">COMMUNITY UPDATES</span>
        </div>

        {/* comments */}
        <div className="flex flex-col gap-6 p-4">
          <PostComposer />

          <PostCard
            author={{ name: 'Pedro Santos' }}
            content="Volunteers are needed to help with sandbagging efforts in flood-prone areas. Please contact the local barangay office if you can assist."
            timestamp="1 day ago"
            reportCount={2}
          />

          <PostCard
            author={{ name: 'Juan Dela Cruz' }}
            content="Heavy rainfall in Zapote area, its starting to accumulate water. Please be careful if you're heading this way! #Flood"
            imageUrl="/images/before_flood_image.jpg"
            timestamp="2 hrs ago"
            reportCount={3}
          />
        </div>
      </div>
    </div>
  );
}
