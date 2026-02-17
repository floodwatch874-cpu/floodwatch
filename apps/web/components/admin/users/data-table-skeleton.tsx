import { Skeleton } from '@/components/ui/skeleton';

export function DataTableSkeleton({ rows = 8 }: { rows?: number }) {
  return (
    <div className="w-full">
      {/* Table header */}
      <div className="grid grid-cols-5 gap-4 px-4 py-3 border-b">
        {['USER', 'ROLE', 'JOIN DATE', 'STATUS', 'ACTIONS'].map((col) => (
          <Skeleton key={col} className="h-4 w-20" />
        ))}
      </div>

      {/* Table rows */}
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="grid grid-cols-5 gap-4 px-4 py-4 border-b items-center"
        >
          {/* User cell */}
          <div className="flex items-center gap-3">
            <Skeleton className="size-8 rounded-full" />
            <div className="flex flex-col gap-1.5">
              <Skeleton className="h-3.5 w-28" />
              <Skeleton className="h-3 w-36" />
            </div>
          </div>

          {/* Role */}
          <Skeleton className="h-3.5 w-12" />

          {/* Join date */}
          <Skeleton className="h-3.5 w-32" />

          {/* Status badge */}
          <div className="flex justify-center">
            <Skeleton className="h-7 w-20 rounded-full" />
          </div>

          {/* Actions */}
          <div className="flex justify-center gap-2">
            <Skeleton className="size-8 rounded-lg" />
            <Skeleton className="size-8 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
}
