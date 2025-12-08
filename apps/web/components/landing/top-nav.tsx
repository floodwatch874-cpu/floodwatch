import Image from 'next/image';
import Link from 'next/link';
import TopNavShadow from '@/components/top-nav-shadow';

const navItems = [
  { label: 'Features', url: '#features' },
  { label: 'Safety Guides', url: '#safety-guides' },
  { label: 'Latest News', url: '#latest-news' },
  { label: 'About Us', url: '#about-us' },
];

export default function TopNav() {
  return (
    <>
      <header
        className="flex w-full bg-[#0066CC] fixed h-16 top-0 z-10 transition-shadow duration-200"
        id="top-nav"
      >
        <nav className="flex justify-between p-4 container mx-auto">
          <div className="flex items-center gap-4 md:gap-10">
            <Link href="/" className="flex items-center gap-x-2">
              <Image
                src="/logo-white.svg"
                alt="FloodWatch Logo"
                width={32}
                height={32}
              />
              <h1 className="text-[#FFFFFF] font-bold text-xl">FloodWatch</h1>
            </Link>
          </div>

          <div className="flex items-center gap-10">
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.url}
                  className="text-lg text-white hover:text-[#F5F5F5] active:text-[#EAEAEA]"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <Link href="/login">
                <button
                  className="flex items-center justify-center gap-2 bg-[#FFFFFF] hover:bg-[#F5F5F5] active:bg-[#EAEAEA] 
              text-[#5B5B5B] px-6 py-1 rounded-2xl text-sm md:text-lg
                hover:shadow-xl transition duration-200 font-medium"
                >
                  Login
                </button>
              </Link>
              <Link href="/signup">
                <button
                  className="flex items-center justify-center gap-2 bg-[#81B2E2] hover:bg-[#6CA2DA] active:bg-[#578FCF] 
              text-white px-6 py-1 rounded-2xl text-sm md:text-lg
                hover:shadow-xl hover:scale-105 transition duration-200 font-medium"
                >
                  Sign Up
                </button>
              </Link>
            </div>
          </div>
        </nav>
      </header>
      <TopNavShadow />
    </>
  );
}
