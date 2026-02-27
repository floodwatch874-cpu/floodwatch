import FloodReportsClient from '@/components/admin/reports/flood-reports-client';
import FloodReportsView from '@/components/admin/reports/flood-reports-view';

export default function FloodReportsPage() {
  return (
    <FloodReportsClient>
      <FloodReportsView />
    </FloodReportsClient>
  );
}
