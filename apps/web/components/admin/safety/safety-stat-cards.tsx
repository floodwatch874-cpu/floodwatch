'use client';

import SafetyStatCard from './safety-stat-card';

type SafetyStatCardsProps = {
  totalCount: number;
  shelterCount: number;
  hospitalCount: number;
  activeStatus: 'total' | 'shelter' | 'hospital';
  onStatusChange: (status: 'total' | 'shelter' | 'hospital') => void;
};

export default function SafetyStatCards({
  totalCount,
  shelterCount,
  hospitalCount,
  activeStatus,
  onStatusChange,
}: SafetyStatCardsProps) {
  return (
    <div className="grid grid-cols-3 gap-8">
      <SafetyStatCard
        label="Total Safety Locations"
        count={totalCount}
        status="total"
        isActive={activeStatus === 'total'}
        onClick={() => onStatusChange('total')}
      />
      <SafetyStatCard
        label="Shelter Locations"
        count={shelterCount}
        status="shelter"
        isActive={activeStatus === 'shelter'}
        onClick={() => onStatusChange('shelter')}
      />
      <SafetyStatCard
        label="Hospital Locations"
        count={hospitalCount}
        status="hospital"
        isActive={activeStatus === 'hospital'}
        onClick={() => onStatusChange('hospital')}
      />
    </div>
  );
}
