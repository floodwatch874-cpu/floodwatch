'use client';

import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Avatar as UIAvatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import Avatar from 'boring-avatars';
import { IconPhoto, IconSend } from '@tabler/icons-react';
import { useUser } from '@/hooks/use-user';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';

export default function PostComposer() {
  const { user, isLoading } = useUser();

  const isLoggedIn = !isLoading && !!user;

  return (
    <>
      {/* share an update with the community */}
      <div className="flex flex-col gap-3 sm:gap-4 rounded-2xl p-3 sm:p-4 md:p-5 border">
        {/* user */}
        <div className="flex gap-2 items-center">
          {isLoading ? (
            <>
              <Skeleton className="size-8 sm:size-10 rounded-full shrink-0" />
              <div className="flex flex-col gap-1">
                <Skeleton className="h-3.5 sm:h-4 w-20 sm:w-24" />
                <Skeleton className="h-2.5 sm:h-3 w-14 sm:w-16" />
              </div>
            </>
          ) : isLoggedIn ? (
            <>
              <UIAvatar className="size-8 sm:size-10 border shrink-0">
                <AvatarImage src={user?.profilePicture} />
                <AvatarFallback>
                  <Avatar
                    name={`${user?.name} ${user?.id}`}
                    variant="beam"
                    className="size-8 sm:size-10"
                  />
                </AvatarFallback>
              </UIAvatar>
              <div className="flex flex-col">
                <span className="font-semibold text-sm sm:text-base truncate">
                  {user?.name}
                </span>
                <span className="text-xs text-gray-600 truncate">
                  {user?.role.toUpperCase()}
                </span>
              </div>
            </>
          ) : (
            <>
              <UIAvatar className="size-8 sm:size-10 shrink-0">
                <AvatarFallback>?</AvatarFallback>
              </UIAvatar>
              <div className="flex flex-col min-w-0">
                <span className="font-semibold text-sm sm:text-base text-gray-600">
                  Guest
                </span>
                <span className="text-xs text-gray-600">Sign in to post</span>
              </div>
            </>
          )}
        </div>

        {/* textarea */}
        <Textarea
          id="description"
          placeholder="Share an update with the community..."
          className="min-h-[100px] sm:min-h-[130px] md:min-h-[150px] max-h-[150px] sm:max-h-[180px] bg-gray-100 text-sm"
          style={{ wordBreak: 'break-word' }}
          disabled={isLoading || !isLoggedIn}
        />

        {/* buttons */}
        <div className="flex justify-end gap-4">
          <Button
            variant="outline"
            disabled={isLoading || !isLoggedIn}
            className="text-xs sm:text-sm"
          >
            <IconPhoto />
            <span className="font-poppins">ADD IMAGE</span>
          </Button>
          <Button
            disabled={isLoading || !isLoggedIn}
            className="text-xs sm:text-sm"
          >
            <IconSend className="w-[1.5em]! h-[1.5em]!" />
            <span className="font-poppins">POST UPDATE</span>
          </Button>
        </div>

        {/* login prompt */}
        {!isLoading && !isLoggedIn && (
          <p className="text-sm text-center text-gray-600">
            <Link
              href="/auth/login"
              className="underline font-medium text-gray-600 hover:text-black"
            >
              Sign in
            </Link>{' '}
            to share an update with the community.
          </p>
        )}
      </div>
    </>
  );
}
