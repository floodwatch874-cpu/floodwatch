import Image from 'next/image';
import Link from 'next/link';
import TopNavShadow from '@/components/shared/top-nav-shadow';
import CollapsibleMenu from '@/components/landing/collapsible-menu';
import AuthButtons from '@/components/shared/auth-buttons';

const navItems = [
  { label: 'FEATURES', url: '#features' },
  { label: 'SAFETY GUIDES', url: '#safety-guides' },
  { label: 'LATEST NEWS', url: '#latest-news' },
  { label: 'ABOUT US', url: '#about-us' },
];

export default function TopNav() {
  return (
    <>
      <header
        className="flex w-full bg-[#0066CC]/95 fixed h-16 top-0 z-10 transition-shadow duration-200"
        id="top-nav"
      >
        <nav className="flex justify-between py-4 max-w-7xl w-full mx-auto px-4">
          <div className="flex items-center gap-4 md:gap-10">
            <Link href="/" className="flex items-center gap-x-2">
              <Image
                src="/logo-white.svg"
                alt="FloodWatch Logo"
                width={32}
                height={32}
              />
              <h1 className="text-[#FFFFFF] font-medium text-xl">FloodWatch</h1>
            </Link>
          </div>

          <div className="flex items-center gap-10">
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.url}
                  className="font-poppins text-lg text-white hover:text-[#F5F5F5] active:text-[#EAEAEA]"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <AuthButtons className="hidden md:flex" />

            {/* Mobile Menu */}
            <div className="md:hidden flex items-center">
              <CollapsibleMenu />
            </div>
          </div>
        </nav>
      </header>
      <TopNavShadow />
    </>
  );
}
