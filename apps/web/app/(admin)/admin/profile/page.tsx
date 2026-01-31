import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Avatar as UIAvatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import Avatar from 'boring-avatars';
import { ProfilePhotoModal } from '@/components/admin/profile/profile-photo-modal';
import { Separator } from '@/components/ui/separator';
import AccountTab from '@/components/admin/profile/account-tab';
import { IconLock, IconUser } from '@tabler/icons-react';

export default function ProfilePage() {
  return (
    <div className="flex-1 flex flex-col bg-white p-8 rounded-2xl gap-8 min-h-0">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="font-poppins text-3xl font-bold">Profile</h1>
        <p>Manage your account settings and preferences</p>
      </div>

      <div className="grid grid-cols-2 gap-4 h-full">
        {/* left side */}
        <div className="flex flex-col items-center border-r p-4 gap-8">
          <div className="relative">
            <UIAvatar className="size-40">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>
                <Avatar name="John Doe" variant="beam" />
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

        {/* right side */}
        <div className="flex-1 min-h-0">
          <Tabs
            defaultValue="account"
            className="flex-1 flex flex-col h-full min-h-0"
          >
            <div className="w-full border-b">
              <TabsList variant="line">
                <TabsTrigger
                  value="account"
                  className="data-[state=active]:text-[#0066CC] 
                data-[state=active]:after:bg-[#0066CC] text-base"
                >
                  <IconUser />
                  Account
                </TabsTrigger>
                <TabsTrigger
                  value="password"
                  className="data-[state=active]:text-[#0066CC] 
                data-[state=active]:after:bg-[#0066CC] text-base"
                >
                  <IconLock />
                  Password
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent
              value="account"
              className="flex-1 flex flex-col min-h-0 p-4"
            >
              <AccountTab />
            </TabsContent>
            <TabsContent
              value="password"
              className="flex-1 flex flex-col min-h-0 p-4"
            >
              Change your password here.
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
