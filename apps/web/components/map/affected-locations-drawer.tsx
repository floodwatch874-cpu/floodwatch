'use client';

import {
  REPORT_STATUS_COLOR_MAP,
  SEVERITY_COLOR_MAP,
} from '@/lib/utils/get-color-map';
import { ReportsDto } from '@repo/schemas';
import {
  IconArrowDown,
  IconArrowUp,
  IconCheck,
  IconCircleDashed,
  IconClock,
  IconMessageCircle,
} from '@tabler/icons-react';
import { clsx } from 'clsx';
import { formatDistanceToNow } from 'date-fns';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Drawer } from 'vaul';
import PostComposer from '@/components/shared/post-composer';
import PostCard from '@/components/shared/post-card';
import {
  Avatar as UIAvatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import Avatar from 'boring-avatars';
import { Separator } from '@/components/ui/separator';

const snapPoints = ['0px', '355px', 1];

export default function AffectedLocationsDrawer({
  report,
  onClose,
}: {
  report: ReportsDto;
  onClose?: () => void;
}) {
  const [snap, setSnap] = useState<number | string | null>(snapPoints[1]);
  const [open, setOpen] = useState(true);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) onClose?.();
  };

  const scrollRef = useRef<HTMLDivElement>(null);

  // scroll to top when report changes
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [report?.id]);

  return (
    <Drawer.Root
      modal={false}
      dismissible={true}
      handleOnly={true}
      snapPoints={snapPoints}
      activeSnapPoint={snap}
      setActiveSnapPoint={(newSnap) => {
        if (newSnap === snapPoints[0]) {
          handleOpenChange(false);
        } else {
          setSnap(newSnap);
        }
      }}
      open={open}
      onOpenChange={handleOpenChange}
    >
      <Drawer.Overlay className="absolute inset-0 bg-black/40 pointer-events-none" />

      <Drawer.Content
        data-testid="content"
        className="z-1 absolute flex flex-col bg-white border border-gray-200 border-b-none rounded-t-[10px] bottom-0 left-0 right-0 h-full max-h-full -mx-px"
      >
        <Drawer.Handle className="w-16! my-3! h-3! rounded-full!" />

        <div
          className={clsx('flex flex-col max-w-md mx-auto w-full pt-5 gap-2', {
            'overflow-y-auto': snap === 1,
            'overflow-hidden': snap !== 1,
          })}
        >
          {/* report details */}
          <div
            className="flex flex-col p-3 gap-3 border-l-4 shrink-0 bg-[#fafafa]"
            style={{ borderLeftColor: SEVERITY_COLOR_MAP[report?.severity] }}
          >
            {/* row 1 */}
            <Drawer.Title className="font-poppins text-lg font-semibold">
              {report?.location}
            </Drawer.Title>

            {/* badges */}
            <div className="flex flex-row flex-wrap gap-2">
              <div
                className="flex items-center rounded-full px-3 py-1 w-fit h-fit"
                style={{
                  color: REPORT_STATUS_COLOR_MAP[report?.status],
                  backgroundColor: `${REPORT_STATUS_COLOR_MAP[report?.status]}25`,
                }}
              >
                <div className="flex items-center gap-2 text-xs">
                  {report?.status === 'verified' ? (
                    <IconCheck className="w-[1.5em]! h-[1.5em]!" />
                  ) : (
                    <IconCircleDashed className="w-[1.5em]! h-[1.5em]!" />
                  )}
                  <span className="flex items-center font-medium">
                    {report?.status.toUpperCase()} REPORT
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-poppins font-medium text-sm">
                  SEVERITY:
                </span>
                <div
                  className="flex items-center rounded-full px-3 py-1 w-fit"
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

            {/* reported at */}
            <div className="flex items-center text-xs gap-2 h-fit text-gray-600">
              <IconClock className="w-[1.5em]! h-[1.5em]!" />
              {formatDistanceToNow(new Date(report?.reportedAt), {
                addSuffix: true,
              })}
            </div>

            {/* reported and verified by */}
            <div className="grid grid-cols-2 gap-2">
              {/* reported by */}
              <div className="flex flex-col text-sm">
                <span className="font-poppins font-medium">REPORTED BY</span>
                <div className="flex items-center gap-2">
                  <UIAvatar className="size-5">
                    <AvatarImage src={report?.reporter?.profilePicture} />
                    <AvatarFallback>
                      <Avatar
                        name={`${report?.reporter?.name} ${report?.reporter?.id}`}
                        variant="beam"
                      />
                    </AvatarFallback>
                  </UIAvatar>
                  <span>{report?.reporter?.name}</span>
                </div>
              </div>

              {/* verified by */}
              <div className="flex flex-col text-sm">
                <span className="font-poppins font-medium">VERIFIED BY</span>
                <div className="flex items-center gap-2">
                  <UIAvatar className="size-5">
                    <AvatarImage src={report?.reporter?.profilePicture} />
                    <AvatarFallback>
                      <Avatar
                        name={`${report?.reporter?.name} ${report?.reporter?.id}`}
                        variant="beam"
                      />
                    </AvatarFallback>
                  </UIAvatar>
                  <span>{report?.reporter?.name}</span>
                </div>
              </div>
            </div>

            {/* description */}
            {report?.description && (
              <>
                <Separator />

                <div className="flex flex-col gap-2 text-sm">
                  <span className="font-poppins font-medium">DESCRIPTION</span>
                  <p>{report?.description}</p>
                </div>
              </>
            )}

            {/* votes */}
            <Separator />
            <div className="flex items-center gap-3 text-xs">
              <button className="flex items-center gap-1 rounded-full">
                <IconArrowUp className="w-[1.5em]! h-[1.5em]!" />
                <span>1</span>
              </button>

              <button className="flex items-center gap-1 rounded-full">
                <IconArrowDown className="w-[1.5em]! h-[1.5em]!" />
                <span>1</span>
              </button>
            </div>
            {/*  */}
          </div>

          {/* image */}
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

          <Separator />

          {/* label */}
          <div className="flex items-center gap-2 p-3 text-base">
            <IconMessageCircle className="w-[1.5em]! h-[1.5em]!" />
            <span className="font-poppins font-medium">COMMUNITY UPDATES</span>
          </div>

          {/* comments */}
          <div className="flex flex-col gap-3 px-3 pb-3">
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
      </Drawer.Content>
    </Drawer.Root>
  );
}
