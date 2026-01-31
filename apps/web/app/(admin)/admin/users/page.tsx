import SearchBar from '@/components/search-bar';
import { DataTable } from './data-table';
import { columns } from './columns';
import { AddNewAdminModal } from '@/components/admin/users/add-new-admin-modal';
import UserStatCards from '@/components/admin/users/user-stat-cards';
import { Suspense } from 'react';
import UserStatCardsSkeleton from '@/components/admin/users/user-stat-cards-skeleton';
import { UsersDto } from '@repo/schemas';

export default async function UserManagementPage() {
  // Dummy data for demonstration purposes
  const data: UsersDto[] = [
    {
      id: 1,
      name: 'Alice Johnson',
      email: 'alice.johnson@example.com',
      profilePicture: '',
      role: 'admin',
      joinDate: '2023-01-15T08:30:00Z',
      status: 'active',
    },
    {
      id: 2,
      name: 'Bob Smith',
      email: 'bob.smith@example.com',
      profilePicture: '',
      role: 'user',
      joinDate: '2023-02-10T14:15:00Z',
      status: 'active',
    },
    {
      id: 3,
      name: 'Catherine Lee',
      email: 'catherine.lee@example.com',
      profilePicture: '',
      role: 'user',
      joinDate: '2023-03-05T12:45:00Z',
      status: 'blocked',
    },
    {
      id: 4,
      name: 'David Kim',
      email: 'david.kim@example.com',
      profilePicture: '',
      role: 'admin',
      joinDate: '2023-04-20T10:00:00Z',
      status: 'active',
    },
    {
      id: 5,
      name: 'Eva Martinez',
      email: 'eva.martinez@example.com',
      profilePicture: '',
      role: 'user',
      joinDate: '2023-05-11T09:20:00Z',
      status: 'active',
    },
    {
      id: 6,
      name: 'Franklin Davis',
      email: 'franklin.davis@example.com',
      profilePicture: '',
      role: 'user',
      joinDate: '2023-06-22T11:50:00Z',
      status: 'blocked',
    },
    {
      id: 7,
      name: 'Grace Chen',
      email: 'grace.chen@example.com',
      profilePicture: '',
      role: 'admin',
      joinDate: '2023-07-15T08:10:00Z',
      status: 'active',
    },
    {
      id: 8,
      name: 'Henry Wilson',
      email: 'henry.wilson@example.com',
      profilePicture: '',
      role: 'user',
      joinDate: '2023-08-01T13:35:00Z',
      status: 'active',
    },
    {
      id: 9,
      name: 'Isabella Brown',
      email: 'isabella.brown@example.com',
      profilePicture: '',
      role: 'user',
      joinDate: '2023-09-18T15:40:00Z',
      status: 'blocked',
    },
    {
      id: 10,
      name: 'Jack Thompson',
      email: 'jack.thompson@example.com',
      profilePicture: '',
      role: 'admin',
      joinDate: '2023-10-05T09:55:00Z',
      status: 'active',
    },
  ];

  return (
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

      <Suspense fallback={<UserStatCardsSkeleton />}>
        <UserStatCards totalCount={100} activeCount={80} blockedCount={20} />
      </Suspense>

      <DataTable columns={columns} data={data} />
    </div>
  );
}
