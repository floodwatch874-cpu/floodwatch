import AboutUsSection from '@/components/landing/sections/about-us-section';
import HeroSection from '@/components/landing/sections/hero-section';
import LatestNewsReportSection from '@/components/landing/sections/latest-news-report-section';
import SafetyGuidesSection from '@/components/landing/sections/safety-guides-section';
import SafetyFeaturesSection from '@/components/landing/sections/features-section';

export default function Page() {
  return (
    <>
      <HeroSection />
      <SafetyFeaturesSection />
      <SafetyGuidesSection />
      <LatestNewsReportSection />
      <AboutUsSection />
    </>
  );
}
