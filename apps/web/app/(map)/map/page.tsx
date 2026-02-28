'use client';

import dynamic from 'next/dynamic';

const InteractiveMapPage = dynamic(
  () => import('@/components/map/interactive-map-page'),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-full">
        Loading map...
      </div>
    ),
  },
);

export default function Page() {
  return <InteractiveMapPage />;
}
