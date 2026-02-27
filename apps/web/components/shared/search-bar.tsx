'use client';

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import { IconSearch } from '@tabler/icons-react';
import { useDebouncedCallback } from 'use-debounce';

type SearchBarProps = {
  placeholder: string;
  onSearch?: (value: string) => void;
  defaultValue?: string;
};

export default function SearchBar({
  placeholder,
  onSearch,
  defaultValue,
}: SearchBarProps) {
  const handleSearch = useDebouncedCallback((term: string) => {
    onSearch?.(term);
  }, 300);

  return (
    <InputGroup className="h-12 rounded-full">
      <InputGroupInput
        placeholder={placeholder}
        defaultValue={defaultValue}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <InputGroupAddon>
        <IconSearch />
      </InputGroupAddon>
    </InputGroup>
  );
}
