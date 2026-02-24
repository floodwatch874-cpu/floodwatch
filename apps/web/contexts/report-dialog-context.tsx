'use client';

import { ReportsDto } from '@repo/schemas';
import { createContext, useContext, useState } from 'react';

type DialogType = 'view' | 'delete';

interface ReportDialogContextType {
  report: ReportsDto | null;
  openDialogType: DialogType | null;
  openDialog: (type: DialogType, report: ReportsDto) => void;
  closeDialog: () => void;
  isOpen: (type: DialogType) => boolean;
}

const ReportDialogContext = createContext<ReportDialogContextType | null>(null);

export default function ReportDialogProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [report, setReport] = useState<ReportsDto | null>(null);
  const [openDialogType, setOpenDialogType] = useState<DialogType | null>(null);

  const openDialog = (type: DialogType, report: ReportsDto) => {
    setReport(report);
    setOpenDialogType(type);
  };

  const closeDialog = () => {
    setOpenDialogType(null);
    setTimeout(() => {
      setReport(null);
    }, 150);
  };

  const isOpen = (type: DialogType) => openDialogType === type;

  return (
    <ReportDialogContext.Provider
      value={{ report, openDialogType, openDialog, closeDialog, isOpen }}
    >
      {children}
    </ReportDialogContext.Provider>
  );
}

export function useReportDialog() {
  const ctx = useContext(ReportDialogContext);
  if (!ctx)
    throw new Error('useReportDialog must be used within ReportDialogProvider');
  return ctx;
}
