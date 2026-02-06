import { ActionState } from '@/lib/types/action-state';
import { verifyOtpSecureSchema } from '@repo/schemas';
import z from 'zod';
import { api } from '@/lib/api';
import { mapVerifyOtpAuthError } from '../services/auth/verify-otp-auth-error';

export async function handleVerify(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsedData = verifyOtpSecureSchema.safeParse({
    otp: formData.get('otp'),
  });

  if (!parsedData.success) {
    return {
      errors: z.flattenError(parsedData.error).fieldErrors,
      status: 'error',
    };
  }

  const { otp } = parsedData.data;

  try {
    const response = await api.post('/auth/change-password/verify-otp', {
      otp,
    });

    const { resetSessionId } = response.data;
    sessionStorage.setItem('resetSessionId', resetSessionId);

    return {
      errors: {},
      status: 'success',
    };
  } catch (err) {
    console.error('Failed to verify OTP:', err);

    return {
      errors: mapVerifyOtpAuthError(err).errors,
      status: 'error',
    };
  }
}

export async function handleResend(
  _prevState: ActionState,
  _formData: FormData,
): Promise<ActionState> {
  try {
    await api.post('/auth/change-password/resend-otp');

    return {
      errors: null,
      status: 'success',
    };
  } catch {
    return {
      errors: null,
      status: 'success', // Even if resend fails, we don't want to show an error to the user
    };
  }
}
