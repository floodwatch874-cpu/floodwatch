import LegendItem from '@/components/map/legend-item';
import { IconInfoCircle } from '@tabler/icons-react';

export default function MapLegend({ show }: { show: boolean }) {
  if (!show) return null;

  return (
    <div className="flex flex-col bg-white rounded-xl shadow-md p-4 min-w-[200px] gap-3 h-fit">
      <h3 className="text-sm font-semibold text-gray-600 flex items-center gap-2">
        <IconInfoCircle className="w-[1.5em]! h-[1.5em]!" />{' '}
        <span>Flood Severity Level</span>
      </h3>

      <div className="space-y-2">
        <LegendItem color="bg-[#FB2C36]" label="Critical" />
        <LegendItem color="bg-[#FF6900]" label="High" />
        <LegendItem color="bg-[#F0B204]" label="Moderate" />
        <LegendItem color="bg-[#2B7FFF]" label="Low" />
      </div>
    </div>
  );
}
