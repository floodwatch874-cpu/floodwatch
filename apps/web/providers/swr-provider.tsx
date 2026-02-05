'use client';

import { SWRConfig } from 'swr';

export default function SWRProvider({
  children,
  fallback,
}: {
  children: React.ReactNode;
  fallback: Record<string, unknown>;
}) {
  return (
    <SWRConfig
      value={{
        fallback,
        revalidateOnFocus: false,
        shouldRetryOnError: false,
        revalidateOnReconnect: false,
        dedupingInterval: 60000,
        keepPreviousData: true,
      }}
    >
      {children}
    </SWRConfig>
  );
}
