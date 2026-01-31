import { api } from '@/lib/api';

export const getUsers = async () => {
  try {
    const usersList = await api.get('/users/all');

    return usersList.data;
  } catch {
    return [];
  }
};
