'use client';

import { useRouter } from 'next/navigation';
import React, {
  createContext,
  useCallback,
  useContext,
  useTransition,
} from 'react';

type NavigationContextType = {
  isPending: boolean;
  navigate: (url: string) => void;
  startTransition: (fn: () => void) => void;
};

const NavigationContext = createContext<NavigationContextType>({
  isPending: false,
  navigate: () => {},
  startTransition: () => {},
});

export function NavigationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const navigate = useCallback(
    (url: string) => {
      startTransition(() => {
        router.push(url);
      });
    },
    [router],
  );

  return (
    <NavigationContext.Provider
      value={{ isPending, navigate, startTransition }}
    >
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context)
    throw new Error('useNavigation must be used within NavigationProvider');
  return context;
}
