import Footer from '@/components/auth/footer';
import LoginForm from '@/components/auth/forms/login-form';
import OAuthButton from '@/components/shared/oauth-button';
import Link from 'next/link';

export default async function LoginPage() {
  return (
    <div className="flex flex-col flex-1 mx-auto w-full max-w-md justify-center gap-y-5 px-0 md:px-4">
      <div className="flex flex-col gap-y-2">
        <h3 className="text-2xl">
          Welcome to{' '}
          <span className="text-[#0066CC] font-bold">floodwatch!</span>
        </h3>
        <span className="opacity-50 text-sm">Please enter your details.</span>
      </div>

      <LoginForm />

      <div className="flex gap-4 text-xs items-center text-gray-600">
        <div className="h-px flex-1 bg-gray-100"></div>
        OR
        <div className="h-px flex-1 bg-gray-100"></div>
      </div>

      <OAuthButton provider="google" />

      <div className="flex flex-col py-6 gap-y-10">
        <div className="flex justify-center gap-2 text-sm">
          <span className="opacity-50">Don&apos;t have an Account yet?</span>
          <Link href="/auth/sign-up" className="text-blue-600 hover:underline">
            Register here
          </Link>
        </div>

        <Footer />
      </div>
    </div>
  );
}
