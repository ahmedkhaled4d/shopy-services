import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { VendorRepository } from '@app/database';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private vendorRepository: VendorRepository) {
    super({
      global: true,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || '',
    });
  }

  async validate(payload: any) {
    const vendor = await this.vendorRepository.findById(payload.sub);
    if (!vendor) {
      throw new UnauthorizedException();
    }
    return { vendorId: payload.sub, email: payload.email };
  }
}
