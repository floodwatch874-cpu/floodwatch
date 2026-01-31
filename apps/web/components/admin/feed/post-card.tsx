import {
  Avatar as UIAvatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import {
  IconClock,
  IconFlag,
  IconMapPin,
  IconPoint,
  IconTrash,
} from '@tabler/icons-react';
import Avatar from 'boring-avatars';
import Image from 'next/image';

interface PostCardProps {
  author: {
    name: string;
    avatarUrl?: string;
  };
  content: string;
  imageUrl?: string;
  location: string;
  timestamp: string;
  reportCount: number;
}

export default function PostCard({
  author,
  content,
  imageUrl,
  location,
  timestamp,
  reportCount,
}: PostCardProps) {
  return (
    <div className="flex flex-col rounded-2xl p-4 border gap-4">
      {/* 1st */}
      <div className="flex gap-2 items-center">
        <UIAvatar className="size-10">
          <AvatarImage src={author.avatarUrl} />
          <AvatarFallback>
            <Avatar name={author.name} variant="beam" />
          </AvatarFallback>
        </UIAvatar>

        <div className="flex flex-col w-full">
          <div className="flex justify-between w-full items-center">
            <span className="font-semibold">{author.name}</span>

            <div className="flex items-center gap-4 text-xs text-gray-600">
              <div className="flex items-center gap-1">
                <button className="rounded-full hover:bg-gray-100 p-2 transition">
                  <IconFlag className="w-[1.5em]! h-[1.5em]!" />
                </button>
                <span>{reportCount}</span>
              </div>

              <button className="rounded-full hover:bg-gray-100 p-2 transition">
                <IconTrash className="w-[1.5em]! h-[1.5em]!" />
              </button>
            </div>
          </div>
          <div className="text-xs text-gray-600">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <IconClock className="w-[1.5em]! h-[1.5em]!" />
                <span>{timestamp}</span>
              </div>

              <IconPoint className="w-[1.2em]! h-[1.2em]!" />

              <div className="flex items-center gap-1">
                <IconMapPin className="w-[1.5em]! h-[1.5em]!" />
                <span>{location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <p className="text-sm">{content}</p>
      </div>
      <div>
        {imageUrl && (
          <Image
            src={imageUrl}
            alt="Post Image"
            width={500}
            height={300}
            className="w-full h-auto rounded-lg"
          />
        )}
      </div>
    </div>
  );
}
