'use client';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ActionState } from '@/lib/types/action-state';
import { forgotPasswordSchema } from '@repo/schemas';
import z from 'zod';
import { api } from '@/lib/api';
import { Spinner } from '@/components/ui/spinner';

export default function ForgotPasswordForm() {
  const router = useRouter();

  const [isPending, setIsPending] = useState(false);
  const [state, setState] = useState<ActionState>({
    status: null,
    errors: null,
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsPending(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const parsed = forgotPasswordSchema.safeParse({
      email: formData.get('email'),
    });

    if (!parsed.success) {
      setState({
        errors: z.flattenError(parsed.error).fieldErrors,
        status: 'error',
      });

      (form.elements.namedItem('email') as HTMLInputElement).value = '';

      setIsPending(false);
      return;
    }

    const { email } = parsed.data;
    sessionStorage.setItem('reset_email', email);

    try {
      await api.post('/auth/forgot-password', { email });

      setState({
        errors: {},
        status: 'success',
      });

      form.reset();
      router.replace('/auth/verify-otp');
    } catch {
      // swallowed
    } finally {
      setIsPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label>Email</Label>
        <Input
          type="email"
          name="email"
          placeholder="Enter your email"
          className="rounded-full shadow-sm"
        />
        {state?.errors && 'email' in state.errors && state.errors.email && (
          <p className="text-red-500 text-sm">{state.errors.email}</p>
        )}
      </div>

      <Button
        disabled={isPending}
        className="w-full rounded-full bg-blue-600 hover:bg-blue-700"
      >
        {isPending ? (
          <>
            Sending... <Spinner />
          </>
        ) : (
          'Send code'
        )}
      </Button>
    </form>
  );
}
