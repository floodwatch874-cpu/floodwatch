'use client';

import { SecurityVerification } from '@/components/shared/security-verification-empty';
import { Button } from '@/components/ui/button';
import { IconLink, IconLock } from '@tabler/icons-react';
import { useState } from 'react';
import IconBox from '@/components/shared/icon-box';
import Image from 'next/image';
import { useUser } from '@/hooks/use-user';
import SetPasswordForm from '@/components/forms/set-password-form';
import { getApiUrl } from '@/lib/utils/get-api-url';

export default function SecurityTab() {
  const [passwordAction, setPasswordAction] = useState<'change' | 'set' | null>(
    null,
  );
  const { user } = useUser();

  const handleLink = () => {
    window.location.href = `${getApiUrl()}/auth/google/link`;
  };

  if (passwordAction === 'change') {
    return (
      <div className="flex flex-col">
        <SecurityVerification onBack={() => setPasswordAction(null)} />
      </div>
    );
  }

  if (passwordAction === 'set') {
    return (
      <div className="flex flex-col gap-8 h-full">
        <h3 className="font-poppins font-semibold">Set Password</h3>
        <SetPasswordForm onSuccess={() => setPasswordAction(null)} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {/* google */}
      <div className="flex flex-col gap-3">
        <h3 className="font-poppins font-semibold">Connected Accounts</h3>
        <div className="flex flex-col bg-gray-100 border rounded-xl p-4 gap-4">
          <div className="flex items-start gap-4 flex-1">
            <IconBox>
              <Image
                src="/google.svg"
                alt="Google Logo"
                width={24}
                height={24}
              />
            </IconBox>

            <div className="flex flex-col">
              <span className="font-medium">Google</span>
              <span className="text-sm text-gray-600">
                Connect your Google account for easier sign-in
              </span>
            </div>
          </div>

          <Button
            className="flex items-center gap-2"
            disabled={user?.hasGoogleAuth}
            onClick={handleLink}
          >
            <IconLink className="w-[1.5em]! h-[1.5em]!" />
            {user?.hasGoogleAuth ? 'Connected' : 'Connect'}
          </Button>
        </div>
      </div>

      {/* Password Section */}
      {user?.hasPassword ? (
        <div className="flex flex-col gap-3">
          <h3 className="font-poppins font-semibold">Password</h3>
          <div className="flex flex-col bg-gray-100 border rounded-xl p-4 gap-4">
            <div className="flex items-start gap-4 flex-1">
              <IconBox color="#0066CC">
                <IconLock className="w-6 h-6" />
              </IconBox>
              <div className="flex flex-col">
                <span className="font-medium">Change password</span>
                <span className="text-sm text-gray-600">
                  Keep your account secure by using a strong password and
                  changing it regularly
                </span>
              </div>
            </div>
            <Button
              className="flex items-center gap-2"
              onClick={() => setPasswordAction('change')}
            >
              <IconLock className="w-[1.5em]! h-[1.5em]!" />
              Change password
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <h3 className="font-poppins font-semibold">Password</h3>
          <div className="flex flex-col bg-gray-100 rounded-xl p-4 gap-4">
            <div className="flex items-start gap-4 flex-1">
              <IconBox color="#E17100">
                <IconLock className="w-6 h-6" />
              </IconBox>
              <div className="flex flex-col">
                <span className="font-medium">Set a password</span>
                <span className="text-sm text-gray-600">
                  You signed up with Google. Set a password to login manually if
                  needed.
                </span>
              </div>
            </div>
            <Button
              className="flex items-center gap-2"
              onClick={() => setPasswordAction('set')}
            >
              <IconLock className="w-[1.5em]! h-[1.5em]!" />
              Set Password
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
