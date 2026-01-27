import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { Button } from '@/components/ui/button';

export default function VerifyOtpForm() {
  return (
    <form className="space-y-6">
      <div className="flex flex-col items-center gap-x-4">
        <InputOTP maxLength={6}>
          <InputOTPGroup className="grid grid-cols-6 gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <InputOTPSlot
                key={i}
                index={i}
                className="w-12 h-12 text-xl rounded-md border"
              />
            ))}
          </InputOTPGroup>
        </InputOTP>
      </div>

      <div className="flex flex-col gap-y-4">
        <Button className="w-full rounded-full bg-blue-600 hover:bg-blue-700">
          Verify code
        </Button>
        <Button variant="secondary" className="w-full rounded-full">
          Resend code
        </Button>
      </div>
    </form>
  );
}
