import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Avatar as UIAvatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import Avatar from 'boring-avatars';
import { IconPhoto, IconSend } from '@tabler/icons-react';
import { GetMeDto } from '@repo/schemas';

export default function PostComposer({ user }: { user: GetMeDto }) {
  return (
    <>
      {/* share an update with the community */}
      <div className="flex flex-col gap-4 rounded-2xl p-4 border">
        {/* user */}
        <div className="flex gap-2 items-center">
          <UIAvatar className="size-size-10 border">
            <AvatarImage src={user?.profilePicture} />
            <AvatarFallback>
              <Avatar
                name={`${user?.name} ${user?.id}`}
                variant="beam"
                className="size-10"
              />
            </AvatarFallback>
          </UIAvatar>
          <div className="flex flex-col">
            <span className="font-semibold">{user?.name}</span>
            <span className="text-xs text-gray-600">
              {user?.role.toUpperCase()}
            </span>
          </div>
        </div>

        {/* textarea */}
        <Textarea
          id="description"
          placeholder="Share an update with the community..."
          className="min-h-[150px] max-h-[150px] bg-gray-100"
          style={{ wordBreak: 'break-word' }}
        />

        {/* buttons */}
        <div className="flex justify-end gap-4">
          <Button variant="outline">
            <IconPhoto />
            Add Image
          </Button>
          <Button>
            <IconSend />
            Post Update
          </Button>
        </div>
      </div>
    </>
  );
}
