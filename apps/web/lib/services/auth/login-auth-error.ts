import axios from 'axios';
import { ActionState } from '@/lib/types/action-state';

export function mapLoginAuthError(err: unknown): ActionState {
  if (axios.isAxiosError(err)) {
    if (err.response?.status === 401 || err.response?.status === 403) {
      return {
        errors: { _form: ['Invalid email or password'] },
        status: 'error',
      };
    }

    return {
      errors: { _form: ['Something went wrong. Please try again.'] },
      status: 'error',
    };
  }

  return {
    errors: { _form: ['An unexpected error occurred'] },
    status: 'error',
  };
}
