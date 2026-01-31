import LatestNewsCard from '../latest-news-card';
export default function LatestNewsReportSection() {
  return (
    <section id="latest-news">
      <div className="flex flex-col gap-6 md:gap-10 py-20 max-w-7xl mx-auto px-4">
        <div className="space-y-2">
          {/* Title */}
          <h2 className="font-poppins text-3xl sm:text-4xl md:text-5xl font-semibold text-center">
            Latest <span className="text-[#2F327D]">News Report</span>
          </h2>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-gray-600 text-center">
            Be updated on latest news for the whole week
          </p>
        </div>

        {/* News Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div>
            <LatestNewsCard variant="featured" src="/images/chloe.jpg" />
          </div>
          <div className="flex flex-col gap-6">
            <LatestNewsCard src="/images/luna.jpg" />
            <LatestNewsCard src="/images/tobi.jpg" />
            <LatestNewsCard src="/images/kazy.jpg" />
          </div>
        </div>
      </div>
    </section>
  );
}
