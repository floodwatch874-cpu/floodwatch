'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import ReportStatCard from './report-stat-card';
import { useNavigation } from '@/contexts/navigation-context';
import { useOptimistic } from 'react';

type ReportStatCardsProps = {
  totalCount: number;
  verifiedCount: number;
  unverifiedCount: number;
};

export default function ReportStatCards({
  totalCount,
  verifiedCount,
  unverifiedCount,
}: ReportStatCardsProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { navigate, startTransition } = useNavigation();

  const currentStatus = searchParams.get('status') || 'total';

  const [optimisticStatus, setOptimisticStatus] = useOptimistic(currentStatus);

  const handleStatusChange = (status: 'total' | 'verified' | 'unverified') => {
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
      <ReportStatCard
        label="Total Reports"
        count={totalCount}
        status="total"
        isActive={optimisticStatus === 'total'}
        onClick={() => handleStatusChange('total')}
      />
      <ReportStatCard
        label="Verified Reports"
        count={verifiedCount}
        status="verified"
        isActive={optimisticStatus === 'verified'}
        onClick={() => handleStatusChange('verified')}
      />
      <ReportStatCard
        label="Unverified Reports"
        count={unverifiedCount}
        status="unverified"
        isActive={optimisticStatus === 'unverified'}
        onClick={() => handleStatusChange('unverified')}
      />
    </div>
  );
}
