import { Icon } from '@tabler/icons-react';

export default function FeatureCard({
  icon: Icon,
  title,
  description,
  color,
}: {
  icon: Icon;
  title: string;
  description: string;
  color: string;
}) {
  return (
    <div
      className="relative flex flex-col bg-white rounded-2xl text-center shadow-lg 
      px-6 py-14 mt-6 md:mt-10
      sm:px-8 sm:py-16
      md:px-10 md:py-20"
    >
      {/* Icon Container */}
      <div
        className={`absolute -top-8 sm:-top-10 left-1/2 -translate-x-1/2 w-16 h-16 sm:w-20 sm:h-20 
        rounded-full flex items-center justify-center shadow-lg ${color}`}
      >
        <Icon className="text-white w-[2.2rem] h-[2.2rem]" />
      </div>

      {/* Title */}
      <div className="space-y-2">
        <h3 className="font-poppins text-xl md:text-2xl font-semibold">
          {title}
        </h3>
        <p className="text-base md:text-lg text-gray-600">{description}</p>
      </div>
    </div>
  );
}
