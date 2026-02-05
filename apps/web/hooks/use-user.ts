'use client';

import useSWR from 'swr';
import { getMe } from '@/lib/services/user/get-me';
import { SWR_KEYS } from '@/lib/constants/swr-keys';

export function useUser() {
  const { data, error, isLoading, mutate } = useSWR(SWR_KEYS.me, getMe);

  return {
    user: data,
    isLoading,
    isError: error,
    mutateUser: mutate,
  };
}
