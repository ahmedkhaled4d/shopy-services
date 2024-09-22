import { Vendor, VendorRepository } from '@app/database';
import * as bcrypt from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private vendorRepository: VendorRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(data: SignUpDto): Promise<Vendor> {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return this.vendorRepository.create({
      email: data.email,
      phone: data.phone,
      name: data.name,
      password: hashedPassword,
    });
  }

  async signIn(
    email: string,
    password: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const vendor = await this.vendorRepository.findByEmail(email);
    if (!vendor) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, vendor.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: vendor.email, sub: vendor._id };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRATION || '7d',
    });

    await this.vendorRepository.update(vendor._id.toString(), { refreshToken });

    return { accessToken, refreshToken };
  }

  async refreshToken(refreshToken: string): Promise<{ accessToken: string }> {
    try {
      const payload = this.jwtService.verify(refreshToken);
      const vendor = await this.vendorRepository.findByEmail(payload.email);

      if (!vendor || vendor.refreshToken !== refreshToken) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      const newPayload = { email: vendor.email, sub: vendor._id };
      const accessToken = this.jwtService.sign(newPayload);

      return { accessToken };
    } catch (e) {
      throw new UnauthorizedException('Invalid refresh token', e);
    }
  }

  async recoverPassword(email: string): Promise<void> {
    const vendor = await this.vendorRepository.findByEmail(email);
    if (!vendor) {
      // Don't reveal that the email doesn't exist
      return;
    }

    // Generate a password reset token
    const resetToken = this.jwtService.sign({ email }, { expiresIn: '1h' });

    // In a real application, you would send this token via email
    console.log(`Password reset token for ${email}: ${resetToken}`);
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
