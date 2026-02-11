import {
  Avatar as UIAvatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import Avatar from 'boring-avatars';
import { ProfilePhotoModal } from '@/components/admin/settings/profile-photo-modal';
import { Separator } from '@/components/ui/separator';
import { GetMeDto } from '@repo/schemas';
import { format } from 'date-fns';

export default function SettingsLeft({ user }: { user: GetMeDto }) {
  let formatted;
  if (user) {
    formatted = format(new Date(user?.createdAt), 'MMMM d, yyyy');
  }

  return (
    <div className="flex flex-col items-center border-r p-4 gap-8">
      <div className="relative">
        <UIAvatar className="size-40 border">
          <AvatarImage src={user?.profilePicture} />
          <AvatarFallback>
            <Avatar
              name={`${user?.name} ${user?.id}`}
              variant="beam"
              className="size-40"
            />
          </AvatarFallback>
        </UIAvatar>

        {/* Button */}
        <ProfilePhotoModal />
      </div>

      <div className="flex flex-col text-center">
        <span className="font-semibold text-2xl">{user?.name}</span>
        <span className="text-gray-600">{user?.email}</span>
      </div>

      <Separator />

      <div className="flex flex-col text-center w-full max-w-md text-gray-600 gap-4">
        <div className="flex justify-between">
          <span>Member since</span>
          <span className="font-semibold">{formatted}</span>
        </div>
        <div className="flex justify-between">
          <span>Post</span>
          <span className="font-semibold">3</span>
        </div>
        <div className="flex justify-between">
          <span>Reports Submitted</span>
          <span className="font-semibold">5</span>
        </div>
      </div>
    </div>
  );
}
