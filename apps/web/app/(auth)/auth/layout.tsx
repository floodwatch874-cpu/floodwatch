import Logo from '@/components/auth/logo';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main>
      <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
        <div className="flex flex-col bg-white px-4 md:px-0">
          <Logo />
          {children}
        </div>

        <div className="relative hidden md:flex">
          <Image
            src="/images/flood_rescue_image.jpg"
            alt="flood rescue image"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />

          <div className="absolute inset-0 bg-black/50" />

          <div className="relative z-10 flex h-full flex-col items-center justify-center px-12 text-white mx-auto text-center">
            <h2 className="mb-4 text-center text-4xl font-bold">
              Our flood <span className="text-[#0066CC]">tracking</span> website
              ensures safety
            </h2>

            <p className="mb-8 max-w-xl text-center text-lg text-gray-200">
              Our website helps communities stay safe during floods with an
              interactive map showing real-time updates of affected areas. Users
              can also post reports and share updates, making it easier for
              everyone to stay informed and connected.
            </p>

            <Button
              variant="secondary"
              className="rounded-full text-lg px-8 py-6"
            >
              Learn more...
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
