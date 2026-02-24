'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ReportsDto } from '@repo/schemas';
import {
  Avatar as UIAvatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import Avatar from 'boring-avatars';
import { format, parseISO } from 'date-fns';
import { IconArrowsUpDown, IconEye, IconTrash } from '@tabler/icons-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { REPORT_STATUS_COLOR_MAP } from '@/lib/utils/get-color-map';
import { useReportDialog } from '@/contexts/report-dialog-context';

export const columns: ColumnDef<ReportsDto>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <button
          className="inline-flex gap-2 items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          USER <IconArrowsUpDown className="w-[1em]! h-[1em]!" />
        </button>
      );
    },
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex items-center gap-3 w-auto">
          <UIAvatar className="size-8">
            <AvatarImage src={user.reporter?.profilePicture} />
            <AvatarFallback>
              <Avatar
                name={`${user.reporter?.name} ${user.reporter?.id}`}
                variant="beam"
                className="size-8"
              />
            </AvatarFallback>
          </UIAvatar>
          <div className="flex flex-col">
            <span className="font-medium">{user.reporter?.name}</span>
            <span className="text-sm text-gray-600">
              {user.reporter?.email}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'reportedAt',
    header: 'REPORTED DATE',
    cell: ({ row }) => {
      const user = row.original;

      return (
        <span className="text-gray-600">
          {format(parseISO(user.reportedAt), 'MMMM dd, yyyy')}
        </span>
      );
    },
  },
  {
    accessorKey: 'status',
    header: () => <span className="flex justify-center">STATUS</span>,
    cell: ({ row }) => {
      const report = row.original;

      const color = REPORT_STATUS_COLOR_MAP[report.status];

      return (
        <div className="flex justify-center w-full">
          <div
            className="inline-flex items-center rounded-full px-4 py-1.5"
            style={{ backgroundColor: `${color}25`, color }}
          >
            <span className="text-sm font-medium capitalize">
              {report.status.toUpperCase()}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'actions',
    header: () => <span className="flex justify-center">ACTIONS</span>,
    cell: ({ row }) => {
      const report = row.original;
      return <ActionCell report={report} />;
    },
  },
];

function ActionCell({ report }: { report: ReportsDto }) {
  const { openDialog } = useReportDialog();

  return (
    <div className="flex justify-center gap-2">
      <Tooltip>
        <TooltipTrigger
          className="text-[#0066CC] bg-[#0066CC]/10 rounded-lg p-1.5 hover:bg-[#0066CC]/20 transition"
          onClick={() => openDialog('view', report)}
        >
          <IconEye className="w-[1.5em]! h-[1.5em]!" />
        </TooltipTrigger>
        <TooltipContent>
          <p>View report</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger
          className={cn(
            `text-[#FB323B] bg-[#FB323B]/10 rounded-lg p-1.5 hover:bg-[#FB323B]/20 transition`,
          )}
          onClick={() => openDialog('delete', report)}
        >
          <IconTrash className="w-[1.5em]! h-[1.5em]!" />
        </TooltipTrigger>
        <TooltipContent>
          <p>Delete report</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
