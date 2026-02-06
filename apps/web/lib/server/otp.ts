import { api } from '../api';

export async function sendOtp() {
  try {
    const res = await api.post('/auth/change-password/send-otp');
    return res.data;
  } catch {}
}
