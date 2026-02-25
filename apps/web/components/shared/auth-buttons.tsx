import Link from 'next/link';

export default function AuthButtons({ className }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 sm:gap-3 ${className ?? ''}`}>
      <Link href="/auth/login" className="w-full sm:w-auto">
        <button
          className="
            w-full sm:w-auto
            flex items-center justify-center
            px-3 sm:px-5 md:px-6
            py-1.5 sm:py-2
            text-xs sm:text-sm md:text-base
            rounded-xl sm:rounded-2xl
            bg-white hover:bg-[#F5F5F5] active:bg-[#EAEAEA]
            text-[#5B5B5B]
            font-medium
            transition duration-200
            hover:shadow-lg
            whitespace-nowrap
            shrink-0
          "
        >
          Login
        </button>
      </Link>

      <Link href="/auth/sign-up" className="w-full sm:w-auto">
        <button
          className="
          w-full sm:w-auto
          flex items-center justify-center
          px-3 sm:px-5 md:px-6
          py-1.5 sm:py-2
          text-xs sm:text-sm md:text-base
          rounded-xl sm:rounded-2xl
          bg-[#81B2E2] hover:bg-[#6CA2DA] active:bg-[#578FCF]
          text-white
          font-medium
          transition duration-200
          hover:shadow-lg sm:hover:scale-105
          whitespace-nowrap
          shrink-0
        "
        >
          Sign Up
        </button>
      </Link>
    </div>
  );
}
