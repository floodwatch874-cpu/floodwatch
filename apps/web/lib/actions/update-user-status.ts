'use server';

import { apiFetchServer } from '../api-fetch-server';
import { revalidatePath } from 'next/cache';

export async function blockUser(userId: number) {
  try {
    await apiFetchServer(`/admin/users/${userId}/block`, {
      method: 'PATCH',
    });

    revalidatePath('/(admin)/admin/users');

    return { status: 'success' };
  } catch (error) {
    console.error('Error blocking user:', error);
    return { status: 'error', message: 'Failed to block user' };
  }
}

export async function unblockUser(userId: number) {
  try {
    await apiFetchServer(`/admin/users/${userId}/unblock`, {
      method: 'PATCH',
    });

    revalidatePath('/(admin)/admin/users');

    return { status: 'success' };
  } catch (error) {
    console.error('Error unblocking user:', error);
    return { status: 'error', message: 'Failed to unblock user' };
  }
}
