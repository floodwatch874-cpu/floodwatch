import { IconMapPin } from '@tabler/icons-react';

export default function AffectedLocationCard() {
  return (
    <div className="flex-1 flex flex-col gap-4 h-full border p-4 rounded-2xl">
      <h2 className="font-poppins text-xl font-semibold">Affected Locations</h2>

      {/* location item */}
      <div className="flex flex-col gap-4 text-sm">
        <div className="flex items-center gap-2 bg-[#0066CC] text-white rounded-xl p-3 font-medium">
          <IconMapPin className="w-[1.5em]! h-[1.5em]!" />
          <span>Brgy 174, Kai mall caloocan city</span>
        </div>

        {/* location address */}
        <div className="flex items-center gap-2 bg-[#0066CC] text-white rounded-xl p-3 font-medium">
          <IconMapPin className="w-[1.5em]! h-[1.5em]!" />
          <span>1234 Example St, Caloocan, Metro Manila</span>
        </div>
      </div>
    </div>
  );
}
