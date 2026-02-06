import { Injectable, Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import type { ConfigType } from '@nestjs/config';
import { GoogleOAuthProfile } from 'src/types/google';
import googleOauthLinkConfig from 'src/config/google-oauth-link.config';

@Injectable()
export class GoogleLinkStrategy extends PassportStrategy(
  Strategy,
  'google-link',
) {
  constructor(
    @Inject(googleOauthLinkConfig.KEY)
    private googleLinkConfiguration: ConfigType<typeof googleOauthLinkConfig>,
  ) {
    super({
      clientID: googleLinkConfiguration.clientId,
      clientSecret: googleLinkConfiguration.clientSecret,
      callbackURL: googleLinkConfiguration.callbackURL,
      scope: ['email', 'profile'],
    });
  }

  validate(
    _accessToken: string,
    _refreshToken: string,
    profile: { _json: GoogleOAuthProfile },
    done: VerifyCallback,
  ) {
    const google = profile._json;

    const user = {
      googleId: google.sub,
      email: google.email,
      firstName: google.given_name,
      lastName: google.family_name || google.given_name,
      profilePicture: google.picture,
    };

    done(null, user);
  }
}
