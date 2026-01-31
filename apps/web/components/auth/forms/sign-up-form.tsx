'use client';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ActionState } from '@/lib/types/action-state';
import React, { useState } from 'react';
import { useAuth } from '@/providers/auth-provider';
import { signUpSchema } from '@repo/schemas';
import z from 'zod';
import { mapSignupAuthError } from '@/lib/auth/signup-auth-error';
import { Spinner } from '@/components/ui/spinner';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';

export default function SignUpForm() {
  const router = useRouter();
  const { refreshAuth } = useAuth();

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

    const parsed = signUpSchema.safeParse({
      first_name: formData.get('first_name'),
      last_name: formData.get('last_name'),
      home_address: formData.get('home_address'),
      email: formData.get('email'),
      password: formData.get('password'),
      confirm_password: formData.get('confirm_password'),
    });

    if (!parsed.success) {
      setState({
        status: 'error',
        errors: z.flattenError(parsed.error).fieldErrors,
      });

      (form.elements.namedItem('password') as HTMLInputElement).value = '';
      (form.elements.namedItem('confirm_password') as HTMLInputElement).value =
        '';

      setIsPending(false);
      return;
    }

    const {
      first_name,
      last_name,
      home_address,
      email,
      password,
      confirm_password,
    } = parsed.data;

    try {
      await api.post('/auth/signup', {
        first_name,
        last_name,
        home_address,
        email,
        password,
        confirm_password,
      });

      setState({
        status: 'success',
        errors: {},
      });

      await refreshAuth();

      form.reset();
      router.refresh();
    } catch (err) {
      setState({
        errors: mapSignupAuthError(err).errors,
        status: 'error',
      });

      (form.elements.namedItem('password') as HTMLInputElement).value = '';
      (form.elements.namedItem('confirm_password') as HTMLInputElement).value =
        '';
    } finally {
      setIsPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="first_name">Full name</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <Input
              id="first_name"
              name="first_name"
              placeholder="First name"
              className="rounded-full px-4 shadow-sm"
            />
            {state?.errors &&
              'first_name' in state.errors &&
              state.errors.first_name && (
                <p className="text-red-500 text-sm">
                  {state.errors.first_name}
                </p>
              )}
          </div>
          <div>
            <Input
              id="last_name"
              name="last_name"
              placeholder="Last name"
              className="rounded-full px-4 shadow-sm"
            />
            {state?.errors &&
              'last_name' in state.errors &&
              state.errors.last_name && (
                <p className="text-red-500 text-sm">{state.errors.last_name}</p>
              )}
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          className="rounded-full px-4 shadow-sm"
        />
        {state?.errors && 'email' in state.errors && state.errors.email && (
          <p className="text-red-500 text-sm">{state.errors.email}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="home_address">Home Address</Label>
        <Input
          id="home_address"
          name="home_address"
          placeholder="Enter your home address"
          className="rounded-full px-4 shadow-sm"
        />
        {state?.errors &&
          'home_address' in state.errors &&
          state.errors.home_address && (
            <p className="text-red-500 text-sm">{state.errors.home_address}</p>
          )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Enter your password"
          className="rounded-full px-4 shadow-sm"
        />
        {state?.errors &&
          'password' in state.errors &&
          state.errors.password && (
            <p className="text-red-500 text-sm">{state.errors.password}</p>
          )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirm_password">Confirm Password</Label>
        <Input
          id="confirm_password"
          name="confirm_password"
          type="password"
          placeholder="Re-enter your password"
          className="rounded-full px-4 shadow-sm"
        />
        {state?.errors &&
          'confirm_password' in state.errors &&
          state.errors.confirm_password && (
            <p className="text-red-500 text-sm">
              {state.errors.confirm_password}
            </p>
          )}
      </div>

      <Button
        disabled={isPending}
        className="w-full rounded-full bg-[#0066CC] hover:bg-[#005BB8]"
      >
        {isPending ? (
          <>
            Signing up... <Spinner />
          </>
        ) : (
          'Sign up'
        )}
      </Button>
    </form>
  );
}
