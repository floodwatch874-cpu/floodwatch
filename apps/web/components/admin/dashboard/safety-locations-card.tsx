import { IconClock, IconMapPin } from '@tabler/icons-react';

export default function SafetyLocationsCard({
  name = 'Community Safe Haven',
  address = '123 Safety St, Safeville',
  availability = 'Open 24/7',
}: {
  name: string;
  address: string;
  availability: string;
}) {
  return (
    <div
      className="grid border-l-4 rounded-lg p-4 gap-4"
      style={{ borderLeftColor: '#00D69B', backgroundColor: `#00D69B10` }}
    >
      {/* Name */}
      <div className="font-poppins text-xl font-bold">{name}</div>

      {/* Location */}
      <div className="flex items-center gap-2 text-sm ">
        <IconMapPin className="w-[1.5em]! h-[1.5em]! text-[#00D69B]" />
        {address}
      </div>

      {/* availability */}
      <div className="flex items-center text-sm gap-2 font-semibold">
        <IconClock className="w-[1.5em]! h-[1.5em]! text-[#00D69B]" />
        {availability}
      </div>
    </div>
  );
}
