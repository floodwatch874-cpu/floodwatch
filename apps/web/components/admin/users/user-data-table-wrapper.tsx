'use client';
import { useNavigation } from '@/contexts/navigation-context';
import { UserDataTableSkeleton } from './skeleton/user-data-table-skeleton';

export default function UserDataTableWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isPending } = useNavigation();

  if (isPending) return <UserDataTableSkeleton />;

  return <>{children}</>;
}
