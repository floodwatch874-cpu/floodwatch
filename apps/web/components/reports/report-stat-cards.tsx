'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import ReportStatCard from './report-stat-card';

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
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentStatus = searchParams.get('status') || 'total';

  const handleStatusChange = (status: 'total' | 'verified' | 'unverified') => {
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
      <ReportStatCard
        label="Total Reports"
        count={totalCount}
        status="total"
        isActive={currentStatus === 'total'}
        onClick={() => handleStatusChange('total')}
      />
      <ReportStatCard
        label="Verified Reports"
        count={verifiedCount}
        status="verified"
        isActive={currentStatus === 'verified'}
        onClick={() => handleStatusChange('verified')}
      />
      <ReportStatCard
        label="Unverified Reports"
        count={unverifiedCount}
        status="unverified"
        isActive={currentStatus === 'unverified'}
        onClick={() => handleStatusChange('unverified')}
      />
    </div>
  );
}
