import InteractiveMap from '@/components/map/interactive-map';
import { IconLayersIntersect } from '@tabler/icons-react';

export default function MapLeft() {
  return (
    <div className="relative flex-2 bg-gray-100 min-h-0 rounded-2xl overflow-hidden border">
      <button className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white shadow-md">
        <IconLayersIntersect className="w-[1.5em]! h-[1.5em]!" />
      </button>
      <InteractiveMap />
    </div>
  );
}
