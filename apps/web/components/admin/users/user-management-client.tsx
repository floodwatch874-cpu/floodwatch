'use client';

import { UserStatusDialogProvider } from '@/contexts/user-status-dialog-context';
import UserStatusDialog from './user-status-dialog';
import { NavigationProvider } from '@/contexts/navigation-context';

export default function UserManagementClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserStatusDialogProvider>
      <NavigationProvider>
        {children}
        <UserStatusDialog />
      </NavigationProvider>
    </UserStatusDialogProvider>
  );
}
