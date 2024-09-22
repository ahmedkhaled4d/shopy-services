import { Vendor, VendorRepository } from '@app/database';
import * as bcrypt from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { ResetDto, VerifyDto } from './dto/recovery.dto';
import { AuthToken } from './dto/Auth';

@Injectable()
export class AuthService {
  constructor(
    private vendorRepository: VendorRepository,
    private jwtService: JwtService,
  ) {}

  generateOTP(): number {
    return Math.floor(100000 + Math.random() * 900000);
  }

  async getToken(vendor: Vendor): Promise<AuthToken> {
    const payload = {
      email: vendor.email,
      name: vendor.name,
      id: vendor._id,
    };
    const accessToken = await this.jwtService.signAsync(payload);
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRATION,
    });
    await this.vendorRepository.update(vendor._id.toString(), {
      refreshToken,
    });

    return { accessToken, refreshToken };
  }

  async signUp(data: SignUpDto): Promise<Vendor> {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return this.vendorRepository.create({
      email: data.email,
      phone: data.phone,
      name: data.name,
      password: hashedPassword,
    });
  }

  async signIn(email: string, password: string): Promise<AuthToken> {
    const vendor = await this.vendorRepository.findByEmail(email);
    if (!vendor) {
      throw new UnauthorizedException('Invalid Vendor');
    }
    const isPasswordValid = await bcrypt.compare(password, vendor.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.getToken(vendor);
  }

  async refreshToken(refreshToken: string): Promise<AuthToken> {
    try {
      const payload = this.jwtService.verify(refreshToken);
      const vendor = await this.vendorRepository.findByEmail(payload.email);

      if (!vendor || vendor.refreshToken !== refreshToken) {
        throw new UnauthorizedException('Invalid refresh token');
      }
      return this.getToken(vendor);
    } catch (e) {
      throw new UnauthorizedException('Invalid refresh token', e);
    }
  }

  async recoverReset(data: ResetDto): Promise<void> {
    const vendor = await this.vendorRepository.findByEmail(data.email);
    if (!vendor) {
      throw new UnauthorizedException('Invalid Email');
    }
    const now = new Date();
    const expire = new Date(now.getTime() + 60 * 60 * 1000); // Add 1 hour in milliseconds

    // Generate a password reset token
    const code = this.generateOTP();
    await this.vendorRepository.update(String(vendor._id), {
      otp: { code, expire },
    });
    // @TODO:: SEND EMAIL TO VENDOR WITH OTP
    return;
  }

  async recoverVerify(data: VerifyDto): Promise<AuthToken> {
    const vendor = await this.vendorRepository.findByOTP(data.code);
    if (!vendor) {
      throw new UnauthorizedException('Invalid OTP');
    }
    return this.getToken(vendor);
  }

  async resetPassword(resetToken: string, newPassword: string): Promise<void> {
    try {
      const payload = this.jwtService.verify(resetToken);
      const vendor = await this.vendorRepository.findByEmail(payload.email);
      if (!vendor) {
        throw new UnauthorizedException('Invalid reset token');
      }
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await this.vendorRepository.update(vendor._id.toString(), {
        password: hashedPassword,
      });
    } catch (e) {
      throw new UnauthorizedException('Invalid or expired reset token', e);
    }
  }
}
