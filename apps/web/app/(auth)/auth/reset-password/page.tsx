import Footer from '@/components/auth/footer';
import ResetPasswordForm from '@/components/auth/forms/reset-password-form';
import Link from 'next/link';

export default async function ResetPasswordPage() {
  return (
    <div className="flex flex-col flex-1 mx-auto w-full max-w-md justify-center gap-y-5 px-0 md:px-4">
      <div className="flex flex-col gap-y-2">
        <h3 className="text-2xl">
          Set a new <span className="text-[#0066CC] font-bold">password!</span>
        </h3>
        <span className="opacity-50 text-sm">
          Create a new password for your account.
        </span>
      </div>

      <ResetPasswordForm />

      <div className="flex flex-col py-6 gap-y-10">
        <div className="flex justify-center gap-2 text-sm">
          <span className="opacity-50">Remembered your password?</span>
          <Link href="/auth/login" className="text-blue-600 hover:underline">
            Login here
          </Link>
        </div>

        <Footer />
      </div>
    </div>
  );
}
