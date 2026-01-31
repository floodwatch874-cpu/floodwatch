import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

type Props = {
  onBack: () => void;
};

export default function ChangePasswordCard({ onBack }: Props) {
  return (
    <div className="flex flex-1 flex-col rounded-xl border bg-white p-6">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <Button variant="ghost" className="border-none" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-xl font-semibold">Change Password</h2>
      </div>

      {/* Old Password */}
      <div className="mb-5 space-y-1">
        <Label htmlFor="oldpassword">Old Password</Label>
        <Input id="oldpassword" type="password" className="py-6" />
      </div>

      {/* New Password */}
      <div className="mb-5 space-y-1">
        <Label htmlFor="newpassword">New Password</Label>
        <Input id="newpassword" type="password" className="py-6" />
      </div>

      {/* Confirm Password */}
      <div className="mb-5 space-y-1">
        <Label htmlFor="confirmpassword">Re-Enter New Password</Label>
        <Input id="confirmpassword" type="password" className="py-6" />
      </div>

      {/* Forgot Password */}
      <div className="mb-5 flex justify-end">
        <a href="#" className="text-sm text-blue-500 hover:underline">
          Forgot Password?
        </a>
      </div>

      {/* Button */}
      <Button className="mt-auto w-full p-6">Change Password</Button>
    </div>
  );
}
