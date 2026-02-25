'use client';

import Image from 'next/image';
import { Button } from '../ui/button';

const PROVIDER_CONFIG = {
  google: {
    label: 'Continue with Google',
    icon: '/google.svg',
    endpoint: '/auth/google',
  },
};

export default function OAuthButton({ provider }: { provider: 'google' }) {
  const config = PROVIDER_CONFIG[provider];

  const handleOAuth = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}${config.endpoint}`;
  };

  return (
    <Button
      onClick={handleOAuth}
      variant="outline"
      className="flex items-center justify-center gap-3 rounded-full"
    >
      <Image
        src={config.icon}
        alt={`${provider} logo`}
        width={20}
        height={20}
      />
      <span className="text-sm font-medium">{config.label}</span>
    </Button>
  );
}
