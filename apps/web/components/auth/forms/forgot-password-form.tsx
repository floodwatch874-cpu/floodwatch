import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function ForgotPasswordForm() {
  return (
    <form className="space-y-6">
      <div className="space-y-2">
        <Label>Email</Label>
        <Input
          type="email"
          placeholder="Enter your Email"
          className="rounded-full shadow-sm"
        />
      </div>

      <Button className="w-full rounded-full bg-blue-600 hover:bg-blue-700">
        Submit
      </Button>
    </form>
  );
}
