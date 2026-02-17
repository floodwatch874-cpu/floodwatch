'use client';

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import { IconSearch } from '@tabler/icons-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function SearchBar({ placeholder }: { placeholder: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSearch = searchParams.get('q') || '';

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (term) params.set('q', term);
    else params.delete('q');

    params.set('page', '1'); // Reset to first page on new search

    router.push(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <InputGroup className="h-12 rounded-full">
      <InputGroupInput
        placeholder={placeholder}
        defaultValue={currentSearch}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <InputGroupAddon>
        <IconSearch />
      </InputGroupAddon>
    </InputGroup>
  );
}
