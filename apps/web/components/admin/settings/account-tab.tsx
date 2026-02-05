import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GetMeDto } from '@repo/schemas';
import { IconPencil } from '@tabler/icons-react';

export default function AccountTab({ user }: { user: GetMeDto }) {
  return (
    <>
      <h3 className="font-poppins font-semibold">Profile Information</h3>
      <div className="flex flex-col gap-y-6 mx-auto w-full ">
        <div className="space-y-2">
          <Label htmlFor="first_name">Full name</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <Input
                id="first_name"
                name="first_name"
                placeholder="First name"
                defaultValue={user?.firstName}
                className="rounded-full px-4 shadow-sm"
                disabled
              />
            </div>
            <div>
              <Input
                id="last_name"
                name="last_name"
                placeholder="Last name"
                defaultValue={user?.lastName}
                className="rounded-full px-4 shadow-sm"
                disabled
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            defaultValue={user?.email}
            className="rounded-full px-4 shadow-sm"
            disabled
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="home_address">Home Address</Label>
          <Input
            id="home_address"
            name="home_address"
            placeholder="Enter your home address"
            defaultValue={user?.homeAddress}
            className="rounded-full px-4 shadow-sm"
            disabled
          />
        </div>

        <Button className="py-5">
          <IconPencil />
          Edit Information
        </Button>
      </div>
    </>
  );
}
