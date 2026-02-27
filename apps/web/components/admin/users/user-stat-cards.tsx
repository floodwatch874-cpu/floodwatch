'use client';

import UserStatCard from '@/components/admin/users/user-stat-card';

type UserStatCardsProps = {
  totalCount: number;
  activeCount: number;
  blockedCount: number;
  activeStatus: 'total' | 'active' | 'blocked';
  onStatusChange: (status: 'total' | 'active' | 'blocked') => void;
};

export default function UserStatCards({
  totalCount,
  activeCount,
  blockedCount,
  activeStatus,
  onStatusChange,
}: UserStatCardsProps) {
  return (
    <div className="grid grid-cols-3 gap-8">
      <UserStatCard
        label="Total Users"
        count={totalCount}
        status="total"
        isActive={activeStatus === 'total'}
        onClick={() => onStatusChange('total')}
      />
      <UserStatCard
        label="Active Users"
        count={activeCount}
        status="active"
        isActive={activeStatus === 'active'}
        onClick={() => onStatusChange('active')}
      />
      <UserStatCard
        label="Blocked Users"
        count={blockedCount}
        status="blocked"
        isActive={activeStatus === 'blocked'}
        onClick={() => onStatusChange('blocked')}
      />
    </div>
  );
}
