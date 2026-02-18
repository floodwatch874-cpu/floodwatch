'use client';

import { IconLogout } from '@tabler/icons-react';
import { SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { useState } from 'react';
import { logout } from '@/lib/services/auth/logout';
import { useRouter } from 'next/navigation';
import { useUser } from '@/hooks/use-user';

export default function LogoutButton() {
  const { mutateUser } = useUser();
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  async function handleLogout(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setIsPending(true);

    try {
      await logout();
      mutateUser(null);
      router.replace('/auth/login');
    } catch (err) {
      console.error('Logout failed', err);
    } finally {
      setIsPending(false);
    }
  }

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        className="text-base cursor-pointer"
        disabled={isPending}
        onClick={handleLogout}
      >
        <div className="flex items-center gap-4 py-6 pl-4 border-l-4 border-transparent text-base">
          <IconLogout className="w-[1.5em]! h-[1.5em]!" aria-hidden />
          <span className="text-lg">
            {isPending ? <>Signing out...</> : 'Sign out'}
          </span>
        </div>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
