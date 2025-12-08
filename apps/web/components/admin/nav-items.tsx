'use client';

import { usePathname } from 'next/navigation';
import {
  IconClipboard,
  IconMap,
  IconUser,
  IconUserCog,
  IconUsers,
} from '@tabler/icons-react';
import { SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export function NavItems() {
  const items = [
    {
      title: 'Dashboard',
      url: '/admin',
      icon: IconClipboard,
    },
    {
      title: 'User Management',
      url: '/admin/users',
      icon: IconUserCog,
    },
    {
      title: 'Interactive Map',
      url: '/admin/map',
      icon: IconMap,
    },
    {
      title: 'Community Feed',
      url: '/admin/feed',
      icon: IconUsers,
    },
    {
      title: 'Profile',
      url: '/admin/profile',
      icon: IconUser,
    },
  ];

  const pathname = usePathname();

  return (
    <>
      {items.map((item) => {
        const isActive = pathname === item.url;
        return (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton asChild className="text-lg">
              <Link
                href={item.url}
                className={cn(
                  'flex items-center gap-4 py-6 pl-4 border-l-4 border-transparent',
                  isActive &&
                    'border-[#0066CC] text-[#0066CC] hover:text-[#0066CC]! hover:bg-transparent',
                )}
              >
                <item.icon className="w-[1em]! h-[1em]!" aria-hidden />
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </>
  );
}
