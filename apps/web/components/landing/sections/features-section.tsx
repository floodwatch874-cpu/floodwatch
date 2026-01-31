import {
  IconUsersGroup,
  IconMapPin2,
  IconShieldCheck,
} from '@tabler/icons-react';
import FeatureCard from '@/components/landing/feature-card';

export default function SafetyFeaturesSection() {
  return (
    <section id="features">
      <div className="flex flex-col gap-6 md:gap-10 py-20 max-w-7xl mx-auto px-4">
        {/* Title */}
        <h2 className="font-poppins text-3xl sm:text-4xl md:text-5xl font-semibold text-center">
          System <span className="text-[#2F327D]">Features</span>
        </h2>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <FeatureCard
            icon={IconUsersGroup}
            title="Community Posting"
            description="Users can view the newsfeed, create posts, like, comment, and share updates with others."
            color="bg-sky-400"
          />

          <FeatureCard
            icon={IconMapPin2}
            title="Interactive Map"
            description="Users can see flooded areas based on a selected location using an interactive map."
            color="bg-teal-400"
          />

          <FeatureCard
            icon={IconShieldCheck}
            title="Safety Guides"
            description="Users can read safety tips and prevention guides that help protect lives during disasters."
            color="bg-indigo-400"
          />

          {/* <div className="relative bg-gray-50 rounded-2xl px-8 py-20 text-center shadow-sm">
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full bg-teal-400 flex items-center justify-center shadow">
              <MapPinned className="text-white " width={40} height={50} />
            </div>

            <h3 className="mt-14 text-2xl font-semibold text-gray-800">
              Interactive Map
            </h3>
            <p className="mt-4 text-lg text-gray-600 leading-relaxed">
              Users can see flooded areas based on a selected location using an
              interactive map.
            </p>
          </div>

          
          <div className="relative bg-gray-50 rounded-2xl px-8 py-20 text-center shadow-sm">
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full bg-indigo-400 flex items-center justify-center shadow">
              <ShieldCheck className="text-white " width={40} height={50} />
            </div>

            <h3 className="mt-14 text-2xl font-semibold text-gray-800">
              Safety Guides
            </h3>
            <p className="mt-4 text-lg text-gray-600 leading-relaxed">
              Users can read safety tips and prevention guides that help protect
              lives during disasters.
            </p>
          </div> */}
        </div>
      </div>
    </section>
  );
}
