import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function ResetPasswordForm() {
  return (
    <form className="space-y-6">
      <div className="space-y-2">
        <Label>New Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Enter your New Password"
          className="rounded-full px-4 shadow-sm"
        />
      </div>

      <div className="space-y-2">
        <Label>Confirm Password</Label>
        <Input
          id="confirm_password"
          name="confirm_password"
          type="password"
          placeholder="Re-enter your new password"
          className="rounded-full px-4 shadow-sm"
        />
      </div>

      <Button className="w-full rounded-full bg-blue-600 hover:bg-blue-700">
        Reset password
      </Button>
    </form>
  );
}
