'use client';

import SafetyLocationsDialogProvider from '@/contexts/safety-locations-dialog-context';

export default function SafetyLocationsClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SafetyLocationsDialogProvider>{children}</SafetyLocationsDialogProvider>
  );
}
