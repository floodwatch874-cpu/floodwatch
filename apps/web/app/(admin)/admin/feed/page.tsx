import CommunityFeedHeader from '@/components/admin/feed/community-feed-header';
import CommunityFeedLeft from '@/components/admin/feed/community-feed-left';
import CommunityFeedRight from '@/components/admin/feed/community-feed-right';

export default function CommunityFeedPage() {
  return (
    <div className="flex-1 flex flex-col bg-white p-8 rounded-2xl gap-8 min-h-0">
      {/* Header */}
      <h1 className="font-poppins text-3xl font-bold">User Management</h1>
      <CommunityFeedHeader />

      <div className="flex-1 flex gap-4 min-h-0">
        <CommunityFeedLeft />
        <CommunityFeedRight />
      </div>
    </div>
  );
}
