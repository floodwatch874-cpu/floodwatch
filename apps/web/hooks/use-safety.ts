'use client';

import useSWR from 'swr';
import { SWR_KEYS } from '@/lib/constants/swr-keys';
import { SafetyLocationsDto } from '@repo/schemas';
import { getSafetyLocations } from '@/lib/fetchers/get-safety';

export function useSafetyLocations() {
  const { data, error, isLoading, isValidating, mutate } = useSWR<
    SafetyLocationsDto[]
  >(SWR_KEYS.safetyLocations, getSafetyLocations);

  return {
    safetyLocations: data,
    isLoading,
    isValidating,
    isError: error,
    mutateSafetyLocations: mutate,
  };
}
