'use client';

import { IconLogout } from '@tabler/icons-react';
import { SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { useState } from 'react';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { clearAuth } from '@/utils/auth-utils';

export default function Logoutbutton() {
  const router = useRouter();

  const [isPending, setIsPending] = useState(false);

  async function handleLogout(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setIsPending(true);

    try {
      // Perform logout logic here, e.g., call an API endpoint to log out
      await api.delete('/auth/logout');

      clearAuth();
      router.replace('/auth/login');
      router.refresh();
    } catch (err) {
      console.error('Logout failed', err);
    } finally {
      setIsPending(false);
    }
  }

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        onClick={handleLogout}
        disabled={isPending}
        asChild
        className="text-lg hover:cursor-pointer"
      >
        <div className="flex items-center gap-4 py-6 pl-4 border-l-4 border-transparent text-base">
          <IconLogout className="w-[1.5em]! h-[1.5em]!" aria-hidden />
          {isPending ? <>Signing out...</> : 'Sign out'}
        </div>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
