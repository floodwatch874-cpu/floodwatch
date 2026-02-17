'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import UserStatCard from '@/components/admin/users/user-stat-card';

type UserStatCardsProps = {
  totalCount: number;
  activeCount: number;
  blockedCount: number;
};

export default function UserStatCards({
  totalCount,
  activeCount,
  blockedCount,
}: UserStatCardsProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentStatus = searchParams.get('status') || 'total';

  const handleStatusChange = (status: 'total' | 'active' | 'blocked') => {
    const params = new URLSearchParams(searchParams.toString());

    if (status === 'total') {
      params.delete('status');
    } else {
      params.set('status', status);
    }

    params.set('page', '1'); // Reset to first page on status change

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="grid grid-cols-3 gap-8">
      <UserStatCard
        label="Total Users"
        count={totalCount}
        status="total"
        isActive={currentStatus === 'total'}
        onClick={() => handleStatusChange('total')}
      />
      <UserStatCard
        label="Active Users"
        count={activeCount}
        status="active"
        isActive={currentStatus === 'active'}
        onClick={() => handleStatusChange('active')}
      />
      <UserStatCard
        label="Blocked Users"
        count={blockedCount}
        status="blocked"
        isActive={currentStatus === 'blocked'}
        onClick={() => handleStatusChange('blocked')}
      />
    </div>
  );
}
