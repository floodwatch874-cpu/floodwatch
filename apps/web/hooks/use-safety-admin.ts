'use client';

import useSWR from 'swr';
import { SWR_KEYS } from '@/lib/constants/swr-keys';
import { SafetyLocationQueryInput } from '@repo/schemas';
import { getSafetyLocationsAdmin } from '@/lib/fetchers/get-safety-admin';

export function useSafetyLocationsAdmin(params: SafetyLocationQueryInput) {
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    [SWR_KEYS.safetyLocationsAdmin, params],
    () => getSafetyLocationsAdmin(params),
    { keepPreviousData: true },
  );

  return {
    safetyLocations: data?.data,
    meta: data?.meta,
    stats: data?.stats,
    isLoading,
    isValidating,
    isError: error,
    mutateSafetyLocations: mutate,
  };
}
