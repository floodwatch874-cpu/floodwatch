import Image from 'next/image';
import Link from 'next/link';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { IconBell } from '@tabler/icons-react';

export default function TopNav() {
  return (
    <>
      <header className="flex w-full bg-[#0066CC] h-16">
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
            <div className="flex items-center gap-4">
              {/* Notification button maybe dropdown */}
              <Button size="icon" className="text-2xl">
                <IconBell className="w-[1em]! h-[1em]!" />
              </Button>

              {/* Avatar dropdown bato? */}
              <Avatar className="ring size-10">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
