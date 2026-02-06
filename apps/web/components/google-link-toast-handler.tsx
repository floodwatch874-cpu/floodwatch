'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function GoogleLinkToastHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const linked = searchParams.get('linked');
    const reason = searchParams.get('reason');

    if (linked === 'success') {
      toast.success('Google account linked successfully!');
      router.replace(window.location.pathname); // Remove query params, stay on current page
    } else if (linked === 'error') {
      if (reason === 'email_mismatch') {
        toast.error('Google email must match your account email');
      } else if (reason === 'already_linked') {
        toast.error('You already linked a Google account');
      } else if (reason === 'user_not_found') {
        toast.error('User not found');
      } else {
        toast.error('Failed to link Google account');
      }
      router.replace(window.location.pathname);
    }
  }, [searchParams, router]);

  return null;
}
