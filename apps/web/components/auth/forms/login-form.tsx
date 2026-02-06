'use client';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { ActionState } from '@/lib/types/action-state';
import { logInSchema } from '@repo/schemas';
import z from 'zod';
import { mapLoginAuthError } from '@/lib/services/auth/login-auth-error';
import { Spinner } from '@/components/ui/spinner';
import { api } from '@/lib/api';
import { mutate } from 'swr';
import { SWR_KEYS } from '@/lib/constants/swr-keys';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const [isPending, setIsPending] = useState(false);
  const [state, setState] = useState<ActionState>({
    status: null,
    errors: null,
  });
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsPending(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const parsed = logInSchema.safeParse({
      email: formData.get('email'),
      password: formData.get('password'),
    });

    if (!parsed.success) {
      setState({
        errors: z.flattenError(parsed.error).fieldErrors,
        status: 'error',
      });

      (form.elements.namedItem('password') as HTMLInputElement).value = '';

      setIsPending(false);
      return;
    }

    const { email, password } = parsed.data;

    try {
      const res = await api.post('/auth/login', { email, password });
      const { user } = res.data;

      setState({
        errors: {},
        status: 'success',
      });

      form.reset();
      await mutate(SWR_KEYS.me);

      if (user?.role === 'admin') router.push('/admin');
      else router.push('/map');
    } catch (err) {
      setState({
        errors: mapLoginAuthError(err).errors,
        status: 'error',
      });

      (form.elements.namedItem('password') as HTMLInputElement).value = '';
    } finally {
      setIsPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          className="rounded-full"
        />
        {state?.errors && 'email' in state.errors && state.errors.email && (
          <p className="text-red-500 text-sm">{state.errors.email}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Enter your password"
          className="rounded-full"
        />
        {state?.errors &&
          'password' in state.errors &&
          state.errors.password && (
            <p className="text-red-500 text-sm">{state.errors.password}</p>
          )}
        {state?.errors && '_form' in state.errors && state.errors._form && (
          <p className="text-red-500 text-sm">{state.errors._form}</p>
        )}
        <div className="text-right text-sm text-gray-500 hover:underline cursor-pointer">
          <Link href="/auth/forgot-password"> Forgot password? </Link>
        </div>
      </div>

      <Button
        disabled={isPending}
        type="submit"
        className="w-full rounded-full"
      >
        {isPending ? (
          <>
            Logging in... <Spinner />
          </>
        ) : (
          'Login'
        )}
      </Button>
    </form>
  );
}
