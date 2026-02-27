import { UserDataTableSkeleton } from '@/components/admin/users/skeleton/user-data-table-skeleton';
import PaginationSkeleton from '@/components/admin/pagination-skeleton';
import { Skeleton } from '@/components/ui/skeleton';
import StatCardSkeleton from '@/components/shared/admin/skeleton/stat-card-skeleton';

export default function UserManagementPageSkeleton() {
  return (
    <div className="flex-1 flex flex-col bg-white p-8 rounded-2xl gap-8 min-h-0">
      {/* Header */}
      <Skeleton className="h-9 w-56" />

      {/* Search bar + Add button row */}
      <div className="flex justify-between gap-4">
        <Skeleton className="flex-1 h-12 rounded-full" />
        <Skeleton className="w-36 h-12" />
      </div>

      <div className="flex-1 flex flex-col min-h-0 gap-4">
        <div className="grid grid-cols-3 gap-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <StatCardSkeleton key={i} />
          ))}
        </div>

        <UserDataTableSkeleton />

        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-40" />

          <PaginationSkeleton />
        </div>
      </div>
    </div>
  );
}
