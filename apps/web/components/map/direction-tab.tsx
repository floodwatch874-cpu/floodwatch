import { IconCurrentLocation, IconNavigation } from '@tabler/icons-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { ReportsDto } from '@repo/schemas';

export default function DirectionTab({ report }: { report: ReportsDto }) {
  return (
    <>
      <div className="flex gap-4 items-start">
        {/* INPUTS */}
        <div className="flex-1 space-y-3">
          <div className="relative">
            <Input
              className="h-12 px-5"
              placeholder="Choose starting point..."
            />
            <IconNavigation className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          </div>

          <div className="relative">
            <Input
              className="h-12 px-5"
              placeholder="Choose destination..."
              value={report?.location}
              readOnly
            />
          </div>
        </div>
      </div>

      <Button variant="ghost" className="w-full py-8 justify-start">
        <div className="flex items-center gap-4 pl-6">
          <div className="bg-blue-200 p-2 rounded-full">
            <IconCurrentLocation className="w-5 h-5 text-blue-600" />
          </div>

          <div className="flex flex-col text-left">
            <span className="text-sm font-semibold text-slate-800">
              Your Location
            </span>
            <span className="text-xs text-slate-400">Click to use GPS</span>
          </div>
        </div>
      </Button>
    </>
  );
}
