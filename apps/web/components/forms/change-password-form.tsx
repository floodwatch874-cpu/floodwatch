'use client';

import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { ActionState } from '@/lib/types/action-state';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useActionState, useEffect } from 'react';
import { changePassword } from '@/lib/actions/password-actions';

export default function ChangePasswordForm({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const initialState: ActionState = {
    status: null,
    errors: null,
  };

  const [state, formAction, isPending] = useActionState(
    changePassword,
    initialState,
  );

  useEffect(() => {
    if (state.status === 'success') {
      // Notify parent component after successful password change
      onSuccess();
    }
  }, [state.status, onSuccess]);

  const resetSessionId = sessionStorage.getItem('resetSessionId');

  return (
    <form action={formAction} className="space-y-6 text-sm">
      {/* include resetSessionId as hidden input */}
      <input type="hidden" name="resetSessionId" value={resetSessionId || ''} />
      <div className="space-y-2">
        <Label htmlFor="new_password">New Password</Label>
        <Input
          id="new_password"
          name="new_password"
          type="password"
          placeholder="Enter your new password"
          className="rounded-full"
        />
        {state.errors?.new_password && (
          <p className="text-red-500">{state.errors.new_password}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirm_new_password">Confirm Password</Label>
        <Input
          id="confirm_new_password"
          name="confirm_new_password"
          type="password"
          placeholder="Enter your confirm password"
          className="rounded-full"
        />
        {state.errors?.confirm_new_password && (
          <p className="text-red-500">{state.errors.confirm_new_password}</p>
        )}
        {state?.errors && '_form' in state.errors && state.errors._form && (
          <p className="text-red-500 text-sm">{state.errors._form}</p>
        )}
        {!resetSessionId && (
          <p className="text-red-500">
            No valid session found. Please verify your identity again.
          </p>
        )}
      </div>

      <Button
        disabled={isPending || !resetSessionId}
        type="submit"
        className="w-full rounded-full"
      >
        {isPending ? (
          <>
            Changing password... <Spinner />
          </>
        ) : (
          'Change Password'
        )}
      </Button>
    </form>
  );
}
