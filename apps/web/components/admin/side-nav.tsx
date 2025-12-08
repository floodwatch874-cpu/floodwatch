import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import Image from 'next/image';
import { IconLogout } from '@tabler/icons-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { NavItems } from './nav-items';

export default function SideNav() {
  return (
    <div className="p-4">
      <Sidebar collapsible="none" className="flex rounded-2xl">
        <SidebarHeader className="w-full py-6 flex items-center">
          <Link href="/" className="flex items-center gap-x-2">
            <Image
              src="/logo.svg"
              alt="FloodWatch Logo"
              width={32}
              height={32}
            />
            <h1 className="text-[#0066CC] font-bold text-xl">FloodWatch</h1>
          </Link>
        </SidebarHeader>
        <SidebarContent className="w-full">
          <SidebarGroup>
            <SidebarGroupContent className="flex flex-col items-center justify-center py-4">
              <div className="py-2">
                <Avatar className="size-24">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>

              <div className="flex flex-col text-center">
                <span className="text-lg font-bold">John Doe</span>
                <span className="text-muted-foreground">CDRRMO</span>
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupContent className="space-y-2">
              <NavItems />
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="border-t py-4 w-full">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="text-lg">
                  <div className="flex items-center gap-4 py-6 pl-4 border-l-4 border-transparent">
                    <IconLogout className="w-[1em]! h-[1em]!" aria-hidden />
                    <span>Sign Out</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarFooter>
      </Sidebar>
    </div>
  );
}
