import { IconClock } from '@tabler/icons-react';
import Image from 'next/image';

export default function PreviewLocationCard() {
  return (
    <div className="flex-2 flex flex-col h-full border p-4 rounded-2xl gap-4">
      {/* header */}
      <h2 className="font-poppins text-xl font-semibold">Preview Location</h2>

      {/* image */}
      <div className="relative flex-1 rounded-2xl overflow-hidden">
        <Image
          src="/images/after_flood_image.jpg"
          alt="Map preview"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* details */}
      <div className="flex flex-col gap-2 text-sm border border-[#FB2C36] p-4 rounded-2xl bg-[#FB2C36]/10">
        <span className="font-medium">Brgy 174, Kai mall caloocan city</span>
        <div className="flex items-center gap-2 text-gray-600">
          <IconClock className="w-[1.5em]! h-[1.5em]!" />
          Posted 24 hrs ago
        </div>
        <div className="flex items-center gap-2">
          Severity Level:
          <div
            className="flex items-center rounded-full px-3 py-1"
            style={{ color: '#FB2C36', backgroundColor: '#FB2C3625' }}
          >
            <span className="text-xs font-medium">Critical</span>
          </div>
        </div>
      </div>
    </div>
  );
}
