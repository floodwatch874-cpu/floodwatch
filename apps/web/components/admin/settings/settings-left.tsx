import {
  Avatar as UIAvatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import Avatar from 'boring-avatars';
import { ProfilePhotoModal } from '@/components/admin/settings/profile-photo-modal';
import { Separator } from '@/components/ui/separator';
import { GetMeDto } from '@repo/schemas';

export default function SettingsLeft({ user }: { user: GetMeDto }) {
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
        <span className="font-semibold text-2xl">John Doe</span>
        <span className="text-gray-600">john.doe@example.com</span>
      </div>

      <Separator />

      <div className="flex flex-col text-center w-full max-w-md text-gray-600 gap-4">
        <div className="flex justify-between">
          <span>Member since</span>
          <span className="font-semibold">January 1, 2022</span>
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
