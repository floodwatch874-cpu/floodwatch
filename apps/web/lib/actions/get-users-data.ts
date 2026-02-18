'use server';

import { userQuerySchema } from '@repo/schemas';
import { UserQuery } from '@/lib/types/user-query';
import { headers } from 'next/headers';

export async function getUsersData(params: UserQuery) {
  const parsed = userQuerySchema.safeParse(params);

  if (!parsed.success) {
    throw new Error('Invalid query parameters');
  }

  const { page = 1, limit = 10, status, q } = parsed.data;

  const querySearch = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    ...(status && { status }),
    ...(q && { q }),
  });

  try {
    const cookie = (await headers()).get('cookie');
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users?${querySearch.toString()}`,
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          cookie: cookie || '',
        },
      },
    );

    return res.json();
  } catch (error) {
    console.error('Error fetching users data:', error);
    throw new Error('Failed to fetch users data');
  }
}
