import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import { IconSearch } from '@tabler/icons-react';

export default function SearchBar() {
  return (
    <InputGroup className="h-12">
      <InputGroupInput placeholder="Search location..." />
      <InputGroupAddon>
        <IconSearch />
      </InputGroupAddon>
    </InputGroup>
  );
}
