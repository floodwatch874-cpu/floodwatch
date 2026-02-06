'use client';

import { Button } from '@/components/ui/button';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import { IconShield } from '@tabler/icons-react';
import VerifyOtpModal from './map/verify-otp-modal';
import { useState } from 'react';
import ChangePasswordForm from '@/components/forms/change-password-form';
import SendOtpButton from './map/send-otp-button';

type Step = 'request' | 'change';

export function SecurityVerification({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState<Step>('request');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      {step === 'request' ? (
        <Empty>
          <EmptyHeader>
            <EmptyMedia className="text-[#0066CC] bg-[#0066CC]/10 p-4 rounded-full">
              <IconShield className="size-12" />
            </EmptyMedia>
            <EmptyTitle>Security Verification Required</EmptyTitle>
            <EmptyDescription>
              To change your password, you need to verify your identity.
              We&apos;ll send a one-time password (OTP) to your registered email
              address.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent className="flex-row justify-center gap-2">
            <SendOtpButton onSent={() => setIsDialogOpen(true)} />
            <Button variant="outline" onClick={onBack}>
              Cancel
            </Button>
          </EmptyContent>
        </Empty>
      ) : step === 'change' ? (
        <div className="flex flex-col gap-8 h-full">
          <h3 className="font-poppins font-semibold">Change Password</h3>
          <ChangePasswordForm onSuccess={() => onBack()} />
        </div>
      ) : null}

      <VerifyOtpModal
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onVerified={() => setStep('change')}
      />
    </>
  );
}
