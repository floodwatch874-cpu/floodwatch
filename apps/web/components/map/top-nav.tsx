'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  Avatar as UIAvatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import Avatar from 'boring-avatars';
import {
  IconAlertTriangle,
  IconBell,
  IconMapPinExclamation,
  IconShieldPin,
} from '@tabler/icons-react';
import { usePanel } from '@/contexts/panel-context';
import AuthButtons from '@/components/shared/auth-buttons';
import { useUser } from '@/hooks/use-user';
import { Skeleton } from '@/components/ui/skeleton';
import Clock from '@/components/map/clock';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function TopNav() {
  const { toggle } = usePanel();
  const { user, isLoading } = useUser();

  return (
    <header className="w-full bg-[#0066CC] relative z-50">
      <nav className="flex flex-wrap 2xl:flex-nowrap w-full justify-between px-3 md:px-4 py-2 mx-auto items-center gap-y-2">
        {/* logo and time */}
        <div className="flex items-center gap-3 sm:gap-6 shrink-0 order-first">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo-white.svg" alt="Logo" width={32} height={32} />
            <h1 className="hidden sm:block text-white font-bold text-lg md:text-xl">
              FloodWatch
            </h1>
          </Link>

          <Clock />
        </div>

        {/* tabs and locations */}
        <div className="no-scrollbar basis-full 2xl:basis-auto flex items-center gap-4 overflow-x-auto order-last 2xl:order-0">
          <Tabs className="shrink-0" defaultValue="all">
            <TabsList className="grid grid-cols-3 w-full font-poppins">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-[#0066CC] data-[state=active]:text-white hover:bg-[#DBEAFE] text-xs md:text-sm"
              >
                ALL
              </TabsTrigger>
              <TabsTrigger
                value="verified"
                className="data-[state=active]:bg-[#0066CC] data-[state=active]:text-white hover:bg-[#DBEAFE] text-xs md:text-sm"
              >
                VERIFIED
              </TabsTrigger>
              <TabsTrigger
                value="unverified"
                className="data-[state=active]:bg-[#0066CC] data-[state=active]:text-white hover:bg-[#DBEAFE] text-xs md:text-sm"
              >
                UNVERIFIED
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <button
            className="flex items-center justify-center gap-2 text-white 
          bg-white/10 border border-white/10 
            px-2 md:px-4 py-1.5 rounded-lg text-xs md:text-sm
            hover:bg-white/20 hover:border-white/20
          active:bg-white/30
            transition-colors duration-200 shrink-0 whitespace-nowrap"
          >
            <IconMapPinExclamation className="w-[1.5em]! h-[1.5em]!" />
            <span className="font-medium">AFFECTED LOCATIONS</span>
          </button>

          <button
            className="flex items-center justify-center gap-2 text-white 
          bg-white/10 border border-white/10 
            px-2 md:px-4 py-1.5 rounded-lg text-xs md:text-sm
          hover:bg-white/20 hover:border-white/20
          active:bg-white/30
            transition-colors duration-200 shrink-0 whitespace-nowrap"
          >
            <IconShieldPin className="w-[1.5em]! h-[1.5em]!" />
            <span className="font-medium">SAFETY LOCATIONS</span>
          </button>
        </div>

        {/* user actions */}
        {isLoading ? (
          <div className="flex items-center gap-2 shrink-0 ml-auto 2xl:ml-0 order-first 2xl:order-0">
            <Skeleton className="w-24 h-9 rounded-md bg-white/20" />
            <Skeleton className="w-6 h-6 rounded-md bg-white/20" />
            <Skeleton className="size-8 rounded-full bg-white/20" />
          </div>
        ) : user ? (
          <div className="flex items-center gap-3 sm:gap-6 shrink-0 ml-auto 2xl:ml-0 order-first 2xl:order-0">
            <button
              className="font-poppins flex justify-center items-center gap-2 bg-white 
            text-[#FB2C36] hover:text-white hover:bg-[#FB2C36] border border-[#FB2C36] 
              rounded-md transition-colors px-2 2xl:px-4 py-1.5 text-xs md:text-sm whitespace-nowrap"
            >
              <IconAlertTriangle className="w-[1.5em]! h-[1.5em]! shrink-0" />
              <span className="hidden md:inline font-medium">REPORT FLOOD</span>
            </button>

            <div className="flex items-center gap-4">
              {/* Notification button maybe dropdown */}
              <button
                className="text-base text-white hover:text-[#F5F5F5] active:text-[#EAEAEA] transition-colors shrink-0"
                onClick={() => toggle('notification')}
              >
                <IconBell className="w-[1.5em]! h-[1.5em]!" />
              </button>

              <button onClick={() => toggle('profile')}>
                <UIAvatar className="size-8 border">
                  <AvatarImage src={user?.profilePicture} />
                  <AvatarFallback>
                    <Avatar
                      name={`${user?.name} ${user?.id}`}
                      variant="beam"
                      className="size-8"
                    />
                  </AvatarFallback>
                </UIAvatar>
              </button>
            </div>
          </div>
        ) : (
          <div className="ml-auto 2xl:ml-0 shrink-0 order-first 2xl:order-0">
            <AuthButtons />
          </div>
        )}
      </nav>
    </header>
  );
}
