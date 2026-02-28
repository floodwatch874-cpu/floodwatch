import {
  Avatar as UIAvatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import { IconClock, IconFlag, IconTrash } from '@tabler/icons-react';
import Avatar from 'boring-avatars';
import Image from 'next/image';

interface PostCardProps {
  author: {
    name: string;
    avatarUrl?: string;
  };
  content: string;
  imageUrl?: string;
  timestamp: string;
  reportCount: number;
}

export default function PostCard({
  author,
  content,
  imageUrl,
  timestamp,
  reportCount,
}: PostCardProps) {
  return (
    <div className="flex flex-col rounded-2xl p-3 sm:p-4 border gap-3 sm:gap-4">
      {/* 1st */}
      <div className="flex gap-2 items-center">
        <UIAvatar className="size-8 sm:size-10 rounded-full shrink-0">
          <AvatarImage src={author.avatarUrl} />
          <AvatarFallback>
            <Avatar
              name={author.name}
              variant="beam"
              className="size-8 sm:size-10"
            />
          </AvatarFallback>
        </UIAvatar>

        <div className="flex flex-col w-full">
          <div className="flex justify-between w-full items-center">
            <span className="font-semibold text-sm sm:text-base truncate">
              {author.name}
            </span>

            <div className="flex items-center gap-2 sm:gap-4 text-xs text-gray-600">
              <div className="flex items-center gap-1">
                <button className="rounded-full hover:bg-gray-100 p-1.5 sm:p-2 transition">
                  <IconFlag className="w-[1.5em]! h-[1.5em]!" />
                </button>
                <span>{reportCount}</span>
              </div>

              <button className="rounded-full hover:bg-gray-100 p-1.5 sm:p-2 transition">
                <IconTrash className="w-[1.5em]! h-[1.5em]!" />
              </button>
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-600">
            <IconClock className="w-[1.5em]! h-[1.5em]!" />
            <span>{timestamp}</span>
          </div>
        </div>
      </div>
      <div className="min-w-0">
        <p className="text-sm">{content}</p>
      </div>
      {imageUrl && (
        <div className="aspect-video w-full relative bg-muted shrink-0 rounded-lg overflow-hidden">
          <Image
            src={imageUrl}
            alt="Post Image"
            fill
            className="object-cover"
          />
        </div>
      )}
    </div>
  );
}
