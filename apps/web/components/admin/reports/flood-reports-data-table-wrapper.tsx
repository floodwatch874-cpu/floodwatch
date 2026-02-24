'use client';

import { useNavigation } from '@/contexts/navigation-context';
import { FloodReportsDataTableSkeleton } from './skeleton/flood-reports-data-table-skeleton';

export default function FloodReportsDataTableWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isPending } = useNavigation();

  if (isPending) return <FloodReportsDataTableSkeleton />;

  return <>{children}</>;
}
