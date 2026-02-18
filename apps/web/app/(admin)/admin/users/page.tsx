import SearchBar from '@/components/search-bar';
import { DataTable } from './data-table';
import { columns } from './columns';
import { AddNewAdminModal } from '@/components/admin/users/add-new-admin-modal';
import UserStatCards from '@/components/admin/users/user-stat-cards';
import { Suspense } from 'react';
import UserStatCardsSkeleton from '@/components/admin/users/user-stat-cards-skeleton';
import UserPagination from '@/components/admin/users/user-pagination';
import { getUsersData } from '@/lib/actions/get-users-data';
import { UserQuery } from '@/lib/types/user-query';
import UserManagementClient from '@/components/admin/users/user-management-client';

export default async function UserManagementPage({
  searchParams,
}: {
  searchParams: UserQuery;
}) {
  const params = await searchParams;

  const data = await getUsersData(params);

  return (
    <UserManagementClient>
      <div className="flex-1 flex flex-col bg-white p-8 rounded-2xl gap-8 min-h-0">
        {/* Header */}
        <h1 className="font-poppins text-3xl font-bold">User Management</h1>

        <div className="flex justify-between gap-4">
          <div className="flex-1">
            <SearchBar placeholder="Search by name..." />
          </div>
          <div className="flex w-fit">
            <AddNewAdminModal />
          </div>
        </div>

        <div className="flex-1 flex flex-col min-h-0 gap-4">
          <Suspense fallback={<UserStatCardsSkeleton />}>
            <UserStatCards
              totalCount={data?.stats?.totalCount ?? 0}
              activeCount={data?.stats?.activeCount ?? 0}
              blockedCount={data?.stats?.blockedCount ?? 0}
            />
          </Suspense>

          <DataTable columns={columns} data={data?.data ?? []} />

          <div className="flex items-center justify-between">
            {/* Pagination controls would go here */}
            <span className="text-sm text-gray-600">
              Showing {data?.data?.length ?? 0} of{' '}
              {data?.stats?.totalCount ?? 0} users
            </span>

            <div>
              <UserPagination
                currentPage={data?.meta?.page ?? 1}
                totalPages={data?.meta?.totalPages ?? 1}
                hasNextPage={data?.meta?.hasNextPage ?? false}
                hasPrevPage={data?.meta?.hasPrevPage ?? false}
              />
            </div>
          </div>
        </div>
      </div>
    </UserManagementClient>
  );
}
