import axios from 'axios';
import { ActionState } from '@/lib/types/action-state';

export function mapResetPasswordAuthError(err: unknown): ActionState {
  if (axios.isAxiosError(err)) {
    const status = err.response?.status;
    const data = err.response?.data;

    console.log(status);

    // Password validation / mismatch
    if (data?.errors) {
      return {
        status: 'error',
        errors: data.errors,
      };
    }

    // OTP / reset session expired or invalid
    if (status === 400 || status === 401 || status === 410) {
      return {
        status: 'error',
        errors: {
          _form: [
            'Your verification session has expired. Please request a new code.',
          ],
        },
      };
    }

    return {
      status: 'error',
      errors: {
        _form: [
          'Unable to reset password at this time. Please try again later.',
        ],
      },
    };
  }

  console.error(err);

  return {
    status: 'error',
    errors: {
      _form: ['Something went wrong. Please try again.'],
    },
  };
}
