import { api } from '@/lib/api';
import { SWR_KEYS } from '@/lib/constants/swr-keys';
import { mutate } from 'swr';

export async function logout() {
  try {
    await api.delete('/auth/logout');
  } catch (err) {
    console.error('Logout failed', err);
  }

  mutate(SWR_KEYS.me, null, false);
}
