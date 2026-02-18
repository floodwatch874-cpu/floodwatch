'use client';

import { createContext, useContext, useState } from 'react';

interface UserStatusDialogContextType {
  userId: number | null;
  open: boolean;
  action: 'block' | 'unblock' | null;
  openDialog: (userId: number, action: 'block' | 'unblock') => void;
  closeDialog: () => void;
}

const UserStatusDialogContext =
  createContext<UserStatusDialogContextType | null>(null);

export function UserStatusDialogProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userId, setUserId] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState<'block' | 'unblock' | null>(null);

  const openDialog = (id: number, action: 'block' | 'unblock') => {
    setUserId(id);
    setAction(action);
    setOpen(true);
  };

  const closeDialog = () => {
    setUserId(null);
    setAction(null);
    setOpen(false);
  };

  return (
    <UserStatusDialogContext.Provider
      value={{ userId, open, action, openDialog, closeDialog }}
    >
      {children}
    </UserStatusDialogContext.Provider>
  );
}

export function useUserStatusDialog() {
  const ctx = useContext(UserStatusDialogContext);
  if (!ctx)
    throw new Error(
      'useUserStatusDialog must be used within UserStatusDialogProvider',
    );
  return ctx;
}
