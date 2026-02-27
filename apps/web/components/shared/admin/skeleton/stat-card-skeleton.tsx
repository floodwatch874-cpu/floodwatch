import { Skeleton } from '@/components/ui/skeleton';

export default function StatCardSkeleton() {
  return (
    <div className="flex flex-col rounded-2xl border shadow-md p-6 gap-2">
      {/* Label skeleton */}
      <Skeleton className="h-7 w-32" />

      <div className="flex flex-col gap-2 flex-1">
        <div className="flex justify-between flex-1">
          {/* Count skeleton */}
          <Skeleton className="h-10 w-20 mt-auto" />

          {/* Icon skeleton */}
          <div className="mt-auto">
            <Skeleton className="rounded-full w-[72px] h-[72px]" />
          </div>
        </div>
      </div>
    </div>
  );
}
