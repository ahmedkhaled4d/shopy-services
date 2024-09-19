import { User, UserRepository } from '@app/database';
import * as bcrypt from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(email: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.userRepository.create({ email, password: hashedPassword });
  }

  async signIn(
    email: string,
    password: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email, sub: user._id };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRATION || '7d',
    });

    await this.userRepository.update(user._id.toString(), { refreshToken });

    return { accessToken, refreshToken };
  }

  async refreshToken(refreshToken: string): Promise<{ accessToken: string }> {
    try {
      const payload = this.jwtService.verify(refreshToken);
      const user = await this.userRepository.findByEmail(payload.email);

      if (!user || user.refreshToken !== refreshToken) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      const newPayload = { email: user.email, sub: user._id };
      const accessToken = this.jwtService.sign(newPayload);

      return { accessToken };
    } catch (e) {
      throw new UnauthorizedException('Invalid refresh token', e);
    }
  }

  async recoverPassword(email: string): Promise<void> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
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
      const user = await this.userRepository.findByEmail(payload.email);

      if (!user) {
        throw new UnauthorizedException('Invalid reset token');
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await this.userRepository.update(user._id.toString(), {
        password: hashedPassword,
      });
    } catch (e) {
      throw new UnauthorizedException('Invalid or expired reset token', e);
    }
  }
}
