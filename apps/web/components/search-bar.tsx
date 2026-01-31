import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import { IconSearch } from '@tabler/icons-react';

export default function SearchBar({ placeholder }: { placeholder: string }) {
  return (
    <InputGroup className="h-12 rounded-full">
      <InputGroupInput placeholder={placeholder} />
      <InputGroupAddon>
        <IconSearch />
      </InputGroupAddon>
    </InputGroup>
  );
}
