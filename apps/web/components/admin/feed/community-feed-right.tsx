import AffectedLocationCard from '@/components/admin/feed/affected-location-card';
import PreviewLocationCard from '@/components/admin/feed/preview-location-card';

export default function CommunityFeedRight() {
  return (
    <div className="flex-1 flex flex-col gap-4 min-h-0">
      <AffectedLocationCard />
      <PreviewLocationCard />
    </div>
  );
}
