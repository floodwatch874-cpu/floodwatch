import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative flex items-center justify-center bg-[#0066CC] w-full min-h-screen px-4 py-20">
      <div className="flex flex-col-reverse md:flex-row gap-10 items-center max-w-7xl justify-center w-full">
        {/* TEXT */}
        <div className="flex flex-col gap-6 max-w-2xl text-left order-2 md:order-1">
          <div className="flex flex-col gap-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold">
              <p className="text-white">
                <span className="text-[#2F327D]">Our flood</span> tracking
                website ensures safety
              </p>
            </h1>

            <p className="text-white text-lg sm:text-xl md:text-2xl">
              Our website helps communities stay safe during floods with an
              interactive map showing real-time updates of affected areas. Users
              can also post reports and share updates.
            </p>
          </div>

          {/* Button below text */}
          <div className="w-full">
            <Link href="/map">
              <button
                className="bg-[#5c9ce6] hover:bg-[#4d8cd1]
                w-full md:w-auto
              text-white font-semibold
                text-lg mm:text-xl
                py-4 mm:py-5
                px-12 mm:px-16
                rounded-full
                shadow-lg hover:shadow-xl
                transition-all duration-300
                hover:-translate-y-0.5"
              >
                Get Started
              </button>
            </Link>
          </div>
        </div>

        {/* IMAGE */}
        <div className="w-full flex justify-center order-1 md:order-2">
          <Image
            src="/images/hero-image.svg"
            alt="hero image"
            width={1440}
            height={1024}
            className="w-full object-cover"
          />
        </div>
      </div>

      {/* Bottom Curve */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-[40px] md:h-[150px] fill-[#EAEAEA]"
        >
          <path d="M0,120V0C150,80,450,120,600,120C750,120,1050,80,1200,0V120H0Z"></path>
        </svg>
      </div>
    </section>
  );
}
