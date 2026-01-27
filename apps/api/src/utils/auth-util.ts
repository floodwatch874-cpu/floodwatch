import { Response } from 'express';

export const setAuthCookies = (
  res: Response,
  accessToken: string,
  refreshToken: string,
  deviceId: string,
  isProduction: boolean,
) => {
  res.cookie('access_token', accessToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'none',
    path: '/',
    maxAge: 15 * 60 * 1000, // 15 minutes
  });

  res.cookie('refresh_token', refreshToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'none',
    path: '/',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  res.cookie('device_id', deviceId, {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'none',
    path: '/',
    maxAge: 365 * 24 * 60 * 60 * 1000, // 1 year
  });
};
