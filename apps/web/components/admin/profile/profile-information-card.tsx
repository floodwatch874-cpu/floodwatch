import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';

type Props = {
  onChangePassword: () => void;
};

export default function ProfileInformationCard({ onChangePassword }: Props) {
  return (
    <div className="flex flex-1 flex-col rounded-xl border bg-white p-6">
      <h2 className="mb-6 text-xl font-semibold">Profile Information</h2>

      {/* Name */}
      <div className="mb-5 space-y-1">
        <Label htmlFor="name">Name</Label>
        <div className="relative">
          <Input id="name" placeholder="Name" className="py-6 pr-10" />
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Pencil className="h-4 w-4" />
          </span>
        </div>
      </div>

      {/* Address */}
      <div className="mb-5 space-y-1">
        <Label htmlFor="address">Address</Label>
        <div className="relative">
          <Input
            id="address"
            placeholder="Home Address Blk Sample"
            className="py-6 pr-10"
          />
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Pencil className="h-4 w-4" />
          </span>
        </div>
      </div>

      {/* Email */}
      <div className="mb-5 space-y-1">
        <Label htmlFor="email">Email Address</Label>
        <Input id="email" value="sample@gmail.com" disabled className="py-6" />
      </div>

      {/* Phone */}
      <div className="mb-8 space-y-1">
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          type="number"
          placeholder="000-000-0000"
          className="py-6"
          disabled
        />
      </div>

      {/* Button */}
      <Button className="mt-auto w-full p-6" onClick={onChangePassword}>
        Change Password
      </Button>
    </div>
  );
}
