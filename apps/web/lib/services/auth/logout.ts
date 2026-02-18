import { api } from '@/lib/api';

export async function logout() {
  try {
    await api.delete('/auth/logout');
  } catch (err) {
    console.error('Logout failed', err);
  }
}
