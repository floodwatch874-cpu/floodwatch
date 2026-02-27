import UserManagementClient from '@/components/admin/users/user-management-client';
import UserManagementView from '@/components/admin/users/user-management-view';

export default async function UserManagementPage() {
  return (
    <UserManagementClient>
      <UserManagementView />
    </UserManagementClient>
  );
}
