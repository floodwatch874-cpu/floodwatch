'use client';

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { ActionState } from '@/lib/types/action-state';
import { Spinner } from '@/components/ui/spinner';
import { verifyOtpSchema } from '@repo/schemas';
import z from 'zod';
import { api } from '@/lib/api';
import { mapVerifyOtpAuthError } from '@/lib/auth/verify-otp-auth-error';

export default function VerifyOtpForm() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  const [otp, setOtp] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const [isResending, setIsResending] = useState(false);
  const RESEND_COOLDOWN = 30;
  const [cooldown, setCooldown] = useState(RESEND_COOLDOWN);

  const [state, setState] = useState<ActionState>({
    status: null,
    errors: null,
  });

  useEffect(() => {
    if (cooldown <= 0) return;

    const interval = setInterval(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [cooldown]);

  useEffect(() => {
    const stored = sessionStorage.getItem('otp_cooldown');
    if (stored) setCooldown(Number(stored));
  }, []);

  useEffect(() => {
    sessionStorage.setItem('otp_cooldown', String(cooldown));
  }, [cooldown]);

  async function handleVerify(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (isVerifying || isResending) return;

    setIsVerifying(true);

    const resetEmail = sessionStorage.getItem('reset_email');
    if (!resetEmail) {
      setIsVerifying(false);
      router.replace('/auth/forgot-password');
      return;
    }

    const parsed = verifyOtpSchema.safeParse({
      email: resetEmail,
      otp,
    });

    if (!parsed.success) {
      setState({
        errors: z.flattenError(parsed.error).fieldErrors,
        status: 'error',
      });
      setOtp('');
      setIsVerifying(false);
      return;
    }

    try {
      const response = await api.post('/auth/verify-otp', {
        email: resetEmail,
        otp,
      });

      const { resetSessionId } = response.data;
      sessionStorage.setItem('resetSessionId', resetSessionId);

      setState({
        errors: {},
        status: 'success',
      });

      router.push('/auth/reset-password');
    } catch (err) {
      setState({
        errors: mapVerifyOtpAuthError(err).errors,
        status: 'error',
      });
      setOtp('');
    } finally {
      setIsVerifying(false);
    }
  }

  async function handleResend() {
    if (isVerifying || isResending || cooldown > 0) return;

    setIsResending(true);

    const resetEmail = sessionStorage.getItem('reset_email');
    if (!resetEmail) {
      setIsResending(false);
      router.replace('/auth/forgot-password');
      return;
    }

    try {
      await api.post('/auth/resend-otp', { email: resetEmail });

      setState({
        errors: {},
        status: 'success',
      });

      setOtp('');
    } catch {
      // swallowed
    } finally {
      setOtp('');
      setIsResending(false);
      setCooldown(RESEND_COOLDOWN);
    }
  }

  return (
    <form ref={formRef} onSubmit={handleVerify} className="space-y-6">
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

        {state?.errors && 'otp' in state.errors && state.errors.otp && (
          <p className="text-red-500 text-sm">{state.errors.otp}</p>
        )}
      </div>

      <div className="flex flex-col gap-y-4">
        <Button
          disabled={isVerifying || isResending}
          className="w-full rounded-full bg-blue-600 hover:bg-blue-700"
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
          onClick={handleResend}
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
  );
}
