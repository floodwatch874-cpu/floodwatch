'use client';

import { useState } from 'react';
import { Button } from '../ui/button';
import { sendOtp } from '@/lib/server/otp';
import { Spinner } from '../ui/spinner';

export default function SendOtpButton({ onSent }: { onSent: () => void }) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleClick() {
    try {
      setIsLoading(true);
      await sendOtp();
      onSent();
    } catch (err) {
      console.error('Failed to send OTP:', err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Button
      className="flex items-center gap-2"
      onClick={handleClick}
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          Sending...
          <Spinner className="w-5 h-5 ml-2" />
        </>
      ) : (
        'Send OTP to Email'
      )}
    </Button>
  );
}
