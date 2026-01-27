import axios from 'axios';
import { ActionState } from '@/lib/types/action-state';

export function mapVerifyOtpAuthError(err: unknown): ActionState {
  if (axios.isAxiosError(err)) {
    return {
      status: 'error',
      errors: {
        otp: ['Invalid or expired code.'],
      },
    };
  }

  return {
    status: 'error',
    errors: {
      otp: ['Invalid or expired code.'],
    },
  };
}
