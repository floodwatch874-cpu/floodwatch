import { formatDistanceToNow } from 'date-fns';
import { IconClock, IconMapPin } from '@tabler/icons-react';

export default function ActiveFloodAlertsCard({
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
  const severityColorMap = {
    critical: '#FB2C36',
    high: '#FF6900',
    moderate: '#F0B204',
    low: '#2B7FFF',
  };

  const color = severityColorMap[severity];

  return (
    <div
      className="grid border-l-4 rounded-lg p-4 gap-4"
      style={{ borderLeftColor: color, backgroundColor: `${color}10` }}
    >
      <div className="flex justify-between">
        {/* Location */}
        <div className="font-poppins flex items-center gap-2 text-base font-semibold">
          <IconMapPin
            className="w-[1.5em]! h-[1.5em]!"
            style={{ color: color }}
          />
          {location}
        </div>

        {/* Badge */}
        <div
          className="flex items-center rounded-full px-4 py-1.5"
          style={{ color: color, backgroundColor: `${color}25` }}
        >
          <span className="text-sm font-medium">{severity.toUpperCase()}</span>
        </div>
      </div>

      {/* message */}
      <p>{message}</p>

      {/* reported at */}
      <div className="flex items-center text-sm gap-2 text-gray-600">
        <IconClock className="w-[1.5em]! h-[1.5em]!" />
        {formatDistanceToNow(new Date(reportedAt), { addSuffix: true })}
      </div>
    </div>
  );
}
