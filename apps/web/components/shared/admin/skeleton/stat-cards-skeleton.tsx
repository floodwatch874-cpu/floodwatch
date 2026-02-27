import UserStatCardSkeleton from '@/components/shared/admin/skeleton/stat-card-skeleton';

export default function StatCardsSkeleton() {
  return (
    <div className="grid grid-cols-3 gap-8">
      <UserStatCardSkeleton />
      <UserStatCardSkeleton />
      <UserStatCardSkeleton />
    </div>
  );
}
