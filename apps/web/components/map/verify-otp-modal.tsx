import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import {
  useActionState,
  useEffect,
  useRef,
  useState,
  startTransition,
} from 'react';
import { ActionState } from '@/lib/types/action-state';
import { Spinner } from '@/components/ui/spinner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { handleVerify, handleResend } from '@/lib/actions/otp-actions-secure';

export default function VerifyOtpModal({
  isOpen,
  onClose,
  onVerified,
}: {
  isOpen: boolean;
  onClose: () => void;
  onVerified: () => void;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [otp, setOtp] = useState('');
  const initialState: ActionState = {
    status: null,
    errors: null,
  };

  const [verifyState, verifyFormAction, isVerifying] = useActionState(
    handleVerify,
    initialState,
  );

  const [, resendFormAction, isResending] = useActionState(
    handleResend,
    initialState,
  );

  useEffect(() => {
    if (verifyState.status === 'success') {
      onClose();
      onVerified();
    }
  }, [verifyState, onVerified, onClose]);

  // Cooldown state for resend button
  const RESEND_COOLDOWN = 30;
  const [cooldown, setCooldown] = useState(RESEND_COOLDOWN);

  useEffect(() => {
    if (cooldown <= 0) return;

    const interval = setInterval(
      () => setCooldown((c) => Math.max(c - 1, 0)),
      1000,
    );
    return () => clearInterval(interval);
  }, [cooldown]);

  async function handleResendClick() {
    if (isResending || cooldown > 0) return;

    // Wrap the action call in startTransition
    startTransition(() => {
      resendFormAction(new FormData(formRef.current!));
      setCooldown(RESEND_COOLDOWN);
    });
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Verify <span className="text-[#0066CC] font-bold">code!</span>
          </DialogTitle>
          <DialogDescription>
            We have sent the 6-digit code to your email address
          </DialogDescription>
        </DialogHeader>
        <form action={verifyFormAction} ref={formRef} className="space-y-6">
          <div className="flex flex-col items-center gap-y-4">
            <InputOTP
              maxLength={6}
              id="otp"
              name="otp"
              value={otp}
              onChange={setOtp}
              onComplete={() => {
                if (!isVerifying) {
                  formRef.current?.requestSubmit();
                }
              }}
              disabled={isVerifying || isResending}
            >
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

            {verifyState?.errors &&
              'otp' in verifyState.errors &&
              verifyState.errors.otp && (
                <p className="text-red-500 text-sm">{verifyState.errors.otp}</p>
              )}
          </div>

          <div className="flex flex-col gap-y-4">
            <Button
              disabled={isVerifying || isResending}
              className="w-full rounded-full bg-[#0066CC] hover:bg-[#005BB5]"
            >
              {isVerifying ? (
                <>
                  Verifying... <Spinner />
                </>
              ) : (
                'Verify code'
              )}
            </Button>

            <Button
              type="button"
              onClick={handleResendClick}
              disabled={isVerifying || isResending || cooldown > 0}
              variant="secondary"
              className="w-full rounded-full"
            >
              {isResending ? (
                <>
                  Resending... <Spinner />
                </>
              ) : cooldown > 0 ? (
                `Resend in ${cooldown}s`
              ) : (
                'Resend code'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
