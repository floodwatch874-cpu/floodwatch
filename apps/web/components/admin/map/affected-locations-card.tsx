import { formatDistanceToNow } from 'date-fns';
import { IconClock, IconMapPin } from '@tabler/icons-react';

export default function AffectedLocationsCard({
  severity = 'high',
  location = 'Barangay 176',
  message = 'Floodwaters reaching waist level, residents advised to evacuate immediately.',
  reportedAt = '2026-01-28T10:30:00Z',
}: {
  severity: 'critical' | 'high' | 'moderate' | 'low';
  location: string;
  message: string;
  reportedAt: string;
}) {
  let color;

  switch (severity) {
    case 'critical':
      color = '#FB2C36';
      break;
    case 'high':
      color = '#FF6900';
      break;
    case 'moderate':
      color = '#F0B204';
      break;
    case 'low':
      color = '#2B7FFF';
      break;
  }

  return (
    <div className="grid rounded-lg p-4 gap-3 border">
      <div className="flex justify-between">
        {/* Location */}
        <div className="font-poppins flex items-center gap-2 text-sm font-semibold">
          <IconMapPin
            className="w-[1.5em]! h-[1.5em]!"
            style={{ color: color }}
          />
          {location}
        </div>

        {/* Badge */}
        <div
          className="flex items-center rounded-full px-3 py-1"
          style={{ color: color, backgroundColor: `${color}25` }}
        >
          <span className="text-xs font-medium">{severity.toUpperCase()}</span>
        </div>
      </div>

      {/* message */}
      <p className="text-sm">{message}</p>

      {/* reported at */}
      <div className="flex items-center text-xs gap-2 text-gray-600">
        <IconClock className="w-[1.5em]! h-[1.5em]!" />
        {formatDistanceToNow(new Date(reportedAt), { addSuffix: true })}
      </div>
    </div>
  );
}
