'use client';

import ViewReportDialog from './view-report-dialog';
import ReportDialogProvider from '@/contexts/report-dialog-context';
import DeleteReportDialog from './delete-report-dialog';

export default function FloodReportsClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReportDialogProvider>
      {children}
      <ViewReportDialog />
      <DeleteReportDialog />
    </ReportDialogProvider>
  );
}
