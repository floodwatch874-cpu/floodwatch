import { ScrollArea } from '@/components/ui/scroll-area';
import PostComposer from '@/components/shared/post-composer';
import PostCard from '@/components/shared/post-card';
import { IconMapPin } from '@tabler/icons-react';

export default function CommunityFeedLeft() {
  return (
    <div className="flex-3 flex flex-col gap-6 min-h-0">
      {/* location */}
      <div className="flex items-center gap-2 bg-[#0066CC] text-white rounded-xl p-4 font-medium">
        <IconMapPin className="w-[1.5em]! h-[1.5em]!" />
        <span className="w-0 flex-1 truncate">
          Location: Kai Mall Zabarte, Camarin Road, Barangay 174, Zone 15,
          Camarin, District 1, Caloocan, Northern Manila District, Metro Manila,
          1422, Philippines
        </span>
      </div>

      <ScrollArea className="flex-1 min-h-0">
        <div className="flex flex-col gap-6 pr-4">
          {/* post composer */}
          <PostComposer />

          {/* feed items */}
          <PostCard
            author={{ name: 'Pedro Santos' }}
            content="Volunteers are needed to help with sandbagging efforts in flood-prone areas. Please contact the local barangay office if you can assist."
            timestamp="1 day ago"
            reportCount={2}
          />

          <PostCard
            author={{ name: 'Juan Dela Cruz' }}
            content="Heavy rainfall in Zapote area, its starting to accumulate water. Please be careful if you're heading this way! #Flood"
            imageUrl="/images/before_flood_image.jpg"
            timestamp="2 hrs ago"
            reportCount={3}
          />

          <PostCard
            author={{ name: 'Maria Clara' }}
            content="The flood levels are rising quickly. Evacuation centers are being set up. Stay safe everyone!"
            imageUrl="/images/after_flood_image.jpg"
            timestamp="24 hrs ago"
            reportCount={5}
          />
        </div>
      </ScrollArea>
    </div>
  );
}
