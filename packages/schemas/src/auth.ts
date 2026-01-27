import { z } from 'zod';

export const logInSchema = z.object({
  email: z.email('Please enter a valid email address'),
  password: z
    .string()
    .refine((val) => val.length > 0, {
      error: 'Password is required',
      abort: true,
    })
    .refine((val) => val.length >= 6, {
      error: 'Password must be at least 6 characters long',
      abort: true,
    }),
});

export const signUpSchema = z
  .object({
    first_name: z
      .string()
      .refine((val) => val.length > 0, {
        error: 'First name is required',
        abort: true,
      })
      .max(50, 'First name cannot exceed 50 characters'),
    last_name: z
      .string()
      .refine((val) => val.length > 0, {
        error: 'Last name is required',
        abort: true,
      })
      .max(50, 'Last name cannot exceed 50 characters'),
    home_address: z
      .string()
      .refine((val) => val.length > 0, {
        error: 'Home address is required',
        abort: true,
      })
      .refine((val) => val.length >= 6, {
        error: 'Home address must be at least 5 characters long',
        abort: true,
      }),
    email: z.email('Please enter a valid email address'),
    password: z
      .string()
      .refine((val) => val.length > 0, {
        error: 'Password is required',
        abort: true,
      })
      .refine((val) => val.length >= 6, {
        error: 'Password must be at least 6 characters long',
        abort: true,
      }),
    confirm_password: z.string('Please confirm your password'),
  })
  .refine((data) => data.password === data.confirm_password, {
    error: 'Passwords do not match',
    path: ['confirm_password'],
  });

export const forgotPasswordSchema = z.object({
  email: z.email('Please enter a valid email address'),
});

export const verifyOtpSchema = z.object({
  email: z.email('Please enter a valid email address'),
  otp: z
    .string()
    .refine((val) => val.length > 0, {
      error: 'OTP is required',
      abort: true,
    })
    .refine((val) => /^\d{6}$/.test(val), {
      error: 'OTP must be a 6-digit number',
      abort: true,
    }),
});

export const resetPasswordSchema = z
  .object({
    resetSessionId: z.string().uuid('Invalid reset session ID'),
    new_password: z
      .string()
      .refine((val) => val.length > 0, {
        error: 'New password is required',
        abort: true,
      })
      .refine((val) => val.length >= 6, {
        error: 'New password must be at least 6 characters long',
        abort: true,
      }),
    confirm_new_password: z.string('Please confirm your new password'),
  })
  .refine((data) => data.new_password === data.confirm_new_password, {
    error: 'Passwords do not match',
  });

export const resendOtpSchema = z.object({
  email: z.email('Please enter a valid email address'),
});

export type LogInDto = z.infer<typeof logInSchema>;
export type SignUpDto = z.infer<typeof signUpSchema>;
export type ForgotPasswordDto = z.infer<typeof forgotPasswordSchema>;
export type VerifyOtpDto = z.infer<typeof verifyOtpSchema>;
export type ResetPasswordDto = z.infer<typeof resetPasswordSchema>;
export type ResendOtpDto = z.infer<typeof resendOtpSchema>;
