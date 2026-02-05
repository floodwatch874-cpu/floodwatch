import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AccountTab from '@/components/admin/settings/account-tab';
import { IconLock, IconUser } from '@tabler/icons-react';
import SecurityTab from '@/components/admin/settings/security-tab';
import { GetMeDto } from '@repo/schemas';

export default function SettingsRight({ user }: { user: GetMeDto }) {
  return (
    <div className="flex-1 min-h-0">
      <Tabs
        defaultValue="account"
        className="flex-1 flex flex-col h-full min-h-0"
      >
        <div className="w-full border-b">
          <TabsList variant="line" className="font-poppins">
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
              Security
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent
          value="account"
          className="flex-1 flex flex-col min-h-0 p-4 gap-8"
        >
          <AccountTab user={user} />
        </TabsContent>
        <TabsContent
          value="password"
          className="flex-1 flex flex-col min-h-0 p-4"
        >
          <SecurityTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
