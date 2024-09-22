import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { VendorRepository } from '@app/database';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    configService: ConfigService,
    private vendorRepository: VendorRepository,
  ) {
    super({
      clientID: configService.get<string>(process.env.GOOGLE_CLIENT_ID),
      clientSecret: configService.get<string>(process.env.GOOGLE_CLIENT_SECRET),
      callbackURL: configService.get<string>(process.env.GOOGLE_CALLBACK_URL),
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    // const { name, emails, photos } = profile;
    const vendor = await this.vendorRepository.findByEmail(profile.emails);
    if (!vendor) {
      throw new UnauthorizedException();
    }
    done(null, vendor);
  }
}
