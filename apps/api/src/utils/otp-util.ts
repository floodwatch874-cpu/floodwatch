import * as bcrypt from 'bcrypt';
import { randomInt } from 'crypto';

export function generateOtp(): string {
  return randomInt(100000, 999999).toString();
}

export async function hashOtp(otp: string) {
  return await bcrypt.hash(otp, 10);
}

export async function verifyOtp(otp: string, hashedOtp: string) {
  return await bcrypt.compare(otp, hashedOtp);
}
