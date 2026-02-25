'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { IconClock } from '@tabler/icons-react';

export default function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="flex items-center justify-center gap-2 text-white 
    bg-white/10 border border-white/10 px-2 sm:px-4 py-1.5 
    rounded-lg text-xs md:text-sm"
    >
      <IconClock className="w-[1.5em]! h-[1.5em]!" />
      <span className="tabular-nums">{format(time, 'hh:mm a')}</span>
    </div>
  );
}
