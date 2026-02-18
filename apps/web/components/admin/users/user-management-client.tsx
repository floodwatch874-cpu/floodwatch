'use client';

import { UserStatusDialogProvider } from '@/contexts/user-status-dialog-context';
import UserStatusDialog from './user-status-dialog';

export default function UserManagementClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserStatusDialogProvider>
      {children}
      <UserStatusDialog />
    </UserStatusDialogProvider>
  );
}
