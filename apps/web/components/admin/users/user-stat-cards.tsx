'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import UserStatCard from '@/components/admin/users/user-stat-card';
import { useNavigation } from '@/contexts/navigation-context';
import { useOptimistic } from 'react';

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
  const searchParams = useSearchParams();
  const { navigate, startTransition } = useNavigation();

  const currentStatus = searchParams.get('status') || 'total';

  const [optimisticStatus, setOptimisticStatus] = useOptimistic(currentStatus);

  const handleStatusChange = (status: 'total' | 'active' | 'blocked') => {
    const params = new URLSearchParams(searchParams.toString());

    if (status === 'total') {
      params.delete('status');
    } else {
      params.set('status', status);
    }

    params.set('page', '1'); // Reset to first page on status change

    startTransition(() => {
      setOptimisticStatus(status);
      navigate(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <div className="grid grid-cols-3 gap-8">
      <UserStatCard
        label="Total Users"
        count={totalCount}
        status="total"
        isActive={optimisticStatus === 'total'}
        onClick={() => handleStatusChange('total')}
      />
      <UserStatCard
        label="Active Users"
        count={activeCount}
        status="active"
        isActive={optimisticStatus === 'active'}
        onClick={() => handleStatusChange('active')}
      />
      <UserStatCard
        label="Blocked Users"
        count={blockedCount}
        status="blocked"
        isActive={optimisticStatus === 'blocked'}
        onClick={() => handleStatusChange('blocked')}
      />
    </div>
  );
}
