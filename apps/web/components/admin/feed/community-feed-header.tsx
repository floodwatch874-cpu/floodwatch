import SearchBar from '@/components/shared/search-bar';
import { IconFlag } from '@tabler/icons-react';

export default function CommunityFeedHeader() {
  return (
    <div className="flex justify-between gap-4">
      <div className="flex-1">
        <SearchBar placeholder="Search location..." />
      </div>
      <div className="flex items-center w-fit">
        <button className="flex items-center justify-center rounded-full p-3 border text-gray-600 hover:bg-gray-100 transition">
          <IconFlag className="w-[1.5em]! h-[1.5em]!" />
        </button>
      </div>
    </div>
  );
}
