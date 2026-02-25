import SearchBar from '@/components/shared/search-bar';
import { DataTable } from './data-table';
import { columns } from './columns';
import { AddNewAdminModal } from '@/components/admin/users/add-new-admin-modal';
import UserStatCards from '@/components/admin/users/user-stat-cards';
import { getUsersData } from '@/lib/actions/get-users-data';
import { UserQuery } from '@/lib/types/user-query';
import UserManagementClient from '@/components/admin/users/user-management-client';
import UserDataTableWrapper from '@/components/admin/users/user-data-table-wrapper';
import PagePagination from '@/components/shared/page-pagination';

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
          <UserStatCards
            totalCount={data?.stats?.totalCount ?? 0}
            activeCount={data?.stats?.activeCount ?? 0}
            blockedCount={data?.stats?.blockedCount ?? 0}
          />

          <UserDataTableWrapper>
            <DataTable columns={columns} data={data?.data ?? []} />
          </UserDataTableWrapper>

          <div className="flex items-center justify-between">
            {/* Pagination controls would go here */}
            <span className="text-sm text-gray-600">
              Showing {data?.data?.length ?? 0} of{' '}
              {data?.stats?.totalCount ?? 0} users
            </span>

            <div>
              <PagePagination
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
