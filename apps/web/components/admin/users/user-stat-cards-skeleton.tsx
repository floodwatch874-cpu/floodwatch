import UserStatCardSkeleton from '@/components/admin/users/user-stat-card-skeleton';

export default function UserStatCardsSkeleton() {
  return (
    <div className="grid grid-cols-3 gap-8">
      <UserStatCardSkeleton />
      <UserStatCardSkeleton />
      <UserStatCardSkeleton />
    </div>
  );
}
