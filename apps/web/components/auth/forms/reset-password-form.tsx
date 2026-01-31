'use client';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { ActionState } from '@/lib/types/action-state';
import { useRouter } from 'next/navigation';
import { resetPasswordSchema } from '@repo/schemas';
import z from 'zod';
import { api } from '@/lib/api';
import { Spinner } from '@/components/ui/spinner';
import { mapResetPasswordAuthError } from '@/lib/auth/reset-password-auth-error';

export default function ResetPasswordForm() {
  const router = useRouter();

  const [isPending, setIsPending] = useState(false);
  const [state, setState] = useState<ActionState>({
    status: null,
    errors: null,
  });

  useEffect(() => {
    sessionStorage.removeItem('reset_email');
    sessionStorage.removeItem('otp_cooldown');
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsPending(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const resetSessionId = sessionStorage.getItem('resetSessionId');

    const parsed = resetPasswordSchema.safeParse({
      resetSessionId,
      new_password: formData.get('new_password'),
      confirm_new_password: formData.get('confirm_new_password'),
    });

    if (!parsed.success) {
      setState({
        errors: z.flattenError(parsed.error).fieldErrors,
        status: 'error',
      });

      (form.elements.namedItem('new_password') as HTMLInputElement).value = '';
      (
        form.elements.namedItem('confirm_new_password') as HTMLInputElement
      ).value = '';

      setIsPending(false);
      return;
    }

    const { new_password, confirm_new_password } = parsed.data;

    try {
      await api.post('/auth/reset-password', {
        resetSessionId,
        new_password,
        confirm_new_password,
      });

      setState({
        errors: {},
        status: 'success',
      });

      sessionStorage.removeItem('resetSessionId');
      router.replace('/auth/login');
    } catch (err) {
      setState(mapResetPasswordAuthError(err));

      (form.elements.namedItem('new_password') as HTMLInputElement).value = '';
      (
        form.elements.namedItem('confirm_new_password') as HTMLInputElement
      ).value = '';
    } finally {
      setIsPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="new_password">New Password</Label>
        <Input
          id="new_password"
          name="new_password"
          type="password"
          placeholder="Enter your new password"
          className="rounded-full px-4 shadow-sm"
        />
        {state?.errors &&
          'new_password' in state.errors &&
          state.errors.new_password && (
            <p className="text-red-500 text-sm">{state.errors.new_password}</p>
          )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirm_new_password">Confirm Password</Label>
        <Input
          id="confirm_new_password"
          name="confirm_new_password"
          type="password"
          placeholder="Re-enter your new password"
          className="rounded-full px-4 shadow-sm"
        />
        {state?.errors &&
          'confirm_new_password' in state.errors &&
          state.errors.confirm_new_password && (
            <p className="text-red-500 text-sm">
              {state.errors.confirm_new_password}
            </p>
          )}
        {state?.errors && '_form' in state.errors && state.errors._form && (
          <p className="text-red-500 text-sm">{state.errors._form}</p>
        )}
      </div>

      <Button
        disabled={isPending}
        className="w-full rounded-full bg-blue-600 hover:bg-blue-700"
      >
        {isPending ? (
          <>
            Resetting... <Spinner />
          </>
        ) : (
          'Reset password'
        )}
      </Button>
    </form>
  );
}
