import { headers } from 'next/headers';

export async function getMeServer() {
  const cookie = (await headers()).get('cookie');

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
    headers: {
      cookie: cookie || '',
    },
    next: { revalidate: 300 },
  });

  if (response.status === 401) {
    return null;
  }

  if (!response.ok) {
    console.error('ME ERROR:', response.status);
    return null;
  }

  const data = await response.json();
  return data;
}
