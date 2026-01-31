import { Input } from '@/components/ui/input';
import { UserRound, Camera } from 'lucide-react';

export default function ProfileFieldCard() {
  return (
    <div className="h-full rounded-xl border bg-white p-6">
      {/* Avatar */}
      <div className="relative flex justify-center">
        <div className="flex h-36 w-36 items-center justify-center rounded-full bg-gray-200">
          <UserRound
            width={80}
            height={80}
            className="text-gray-200"
            fill="gray"
          />
        </div>

        {/* Camera upload button */}
        <label className="absolute bottom-2 right-[calc(50%-72px)] flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-gray-600 text-white shadow hover:bg-gray-700">
          <Camera size={18} />
          <Input type="file" accept="image/*" className="hidden" />
        </label>
      </div>

      {/* Name */}
      <div className="mt-4 text-center">
        <h2 className="text-lg font-semibold">John Doe</h2>
        <p className="text-sm text-gray-500">sample@gmail.com</p>
      </div>

      <div className="my-6 border-t" />

      {/* Stats */}
      <div className="space-y-4 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">Member Since</span>
          <span className="font-medium">October 5, 2025</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Posts</span>
          <span className="font-medium">3</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Reports Submitted</span>
          <span className="font-medium">14</span>
        </div>
      </div>
    </div>
  );
}
