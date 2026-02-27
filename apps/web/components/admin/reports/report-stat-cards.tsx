'use client';

import ReportStatCard from './report-stat-card';

type ReportStatCardsProps = {
  totalCount: number;
  verifiedCount: number;
  unverifiedCount: number;
  activeStatus: 'total' | 'verified' | 'unverified';
  onStatusChange: (status: 'total' | 'verified' | 'unverified') => void;
};

export default function ReportStatCards({
  totalCount,
  verifiedCount,
  unverifiedCount,
  activeStatus,
  onStatusChange,
}: ReportStatCardsProps) {
  return (
    <div className="grid grid-cols-3 gap-8">
      <ReportStatCard
        label="Total Reports"
        count={totalCount}
        status="total"
        isActive={activeStatus === 'total'}
        onClick={() => onStatusChange('total')}
      />
      <ReportStatCard
        label="Verified Reports"
        count={verifiedCount}
        status="verified"
        isActive={activeStatus === 'verified'}
        onClick={() => onStatusChange('verified')}
      />
      <ReportStatCard
        label="Unverified Reports"
        count={unverifiedCount}
        status="unverified"
        isActive={activeStatus === 'unverified'}
        onClick={() => onStatusChange('unverified')}
      />
    </div>
  );
}
