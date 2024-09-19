import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() signUpDto: { email: string; password: string }) {
    return this.authService.signUp(signUpDto.email, signUpDto.password);
  }

  @Post('signin')
  async signIn(@Body() signInDto: { email: string; password: string }) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Post('refresh')
  async refreshToken(@Body() refreshTokenDto: { refreshToken: string }) {
    return this.authService.refreshToken(refreshTokenDto.refreshToken);
  }

  @Post('recover')
  async recoverPassword(@Body() recoverDto: { email: string }) {
    await this.authService.recoverPassword(recoverDto.email);
    return { message: 'If the email exists, a recovery link has been sent.' };
  }

  @Post('reset-password')
  async resetPassword(
    @Body() resetDto: { resetToken: string; newPassword: string },
  ) {
    await this.authService.resetPassword(
      resetDto.resetToken,
      resetDto.newPassword,
    );
    return { message: 'Password has been reset successfully.' };
  }
}
