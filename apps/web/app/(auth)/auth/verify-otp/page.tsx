import Footer from '@/components/auth/footer';
import VerifyOtpForm from '@/components/auth/forms/verify-otp.form';
import Link from 'next/link';

export default function VerifyOtpPage() {
  return (
    <div className="flex flex-col flex-1 mx-auto w-full max-w-md justify-center gap-y-5">
      <div className="flex flex-col items-center gap-y-2">
        <h3 className="text-2xl">
          Verify <span className="text-[#0066CC] font-bold">code!</span>
        </h3>
        <span className="opacity-50 text-sm text-center">
          We have sent the 6-digit code to your email address
        </span>
      </div>

      <VerifyOtpForm />

      <div className="flex flex-col py-6 gap-y-10">
        <div className="flex justify-center text-sm text-gray-500">
          <span>Back to</span>
          <Link
            href="/auth/login"
            className="text-blue-600 hover:underline ml-1"
          >
            login
          </Link>
        </div>

        <Footer />
      </div>
    </div>
  );
}
