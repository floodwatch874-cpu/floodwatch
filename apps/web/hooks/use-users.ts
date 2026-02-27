'use client';

import useSWR from 'swr';
import { SWR_KEYS } from '@/lib/constants/swr-keys';
import { getUsersData } from '@/lib/fetchers/get-users-data';
import { UserQueryInput } from '@repo/schemas';

export function useUsers(params: UserQueryInput) {
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    [SWR_KEYS.users, params],
    () => getUsersData(params),
    { keepPreviousData: true },
  );

  return {
    users: data?.data,
    meta: data?.meta,
    stats: data?.stats,
    isLoading,
    isValidating,
    isError: error,
    mutateUsers: mutate,
  };
}
