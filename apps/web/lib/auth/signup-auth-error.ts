import axios from 'axios';
import { ActionState } from '@/lib/types/action-state';

export function mapSignupAuthError(err: unknown): ActionState {
  if (axios.isAxiosError(err)) {
    const status = err.response?.status;
    const data = err.response?.data;

    // Validation errors from backend
    if (data?.errors) {
      return {
        status: 'error',
        errors: data.errors,
      };
    }

    // Email already exists
    if (status === 409) {
      return {
        status: 'error',
        errors: {
          email: ['An account with this email already exists.'],
        },
      };
    }

    return {
      status: 'error',
      errors: {
        _form: [
          'Unable to create account at this time. Please try again later.',
        ],
      },
    };
  }

  return {
    status: 'error',
    errors: {
      _form: ['Something went wrong. Please try again.'],
    },
  };
}
