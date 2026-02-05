'use client';

import { logout } from '@/lib/services/auth/logout';
import { IconLogout } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LogoutButton() {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  async function handleLogout(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setIsPending(true);

    try {
      await logout();
      router.push('/auth/login');
      router.refresh();
    } catch (err) {
      console.error('Logout failed', err);
    } finally {
      setIsPending(false);
    }
  }

  return (
    <button
      onClick={handleLogout}
      disabled={isPending}
      style={isPending ? { color: '#9E9E9E' } : {}}
    >
      <IconLogout />
    </button>
  );
}
