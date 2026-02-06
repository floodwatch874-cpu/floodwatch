import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { setPassword } from '@/lib/actions/password-actions';
import { ActionState } from '@/lib/types/action-state';
import { useActionState, useEffect } from 'react';

export default function SetPasswordForm({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const initialState: ActionState = {
    status: null,
    errors: null,
  };

  const [state, formAction, isPending] = useActionState(
    setPassword,
    initialState,
  );

  useEffect(() => {
    if (state.status === 'success') {
      // Close the panel after successful password change
      onSuccess();
    }
  }, [state, onSuccess]);

  return (
    <form action={formAction} className="space-y-6 text-sm">
      {/* include resetSessionId as hidden input */}
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
      </div>

      <Button
        disabled={isPending}
        type="submit"
        className="w-full rounded-full"
      >
        {isPending ? (
          <>
            Setting password... <Spinner />
          </>
        ) : (
          'Set Password'
        )}
      </Button>
    </form>
  );
}
