import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto.email, signUpDto.password);
  }

  @Post('signin')
  async signIn(@Body() signInDto: SignInDto) {
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

  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleAuth() {
    // This route will initiate the Google OAuth flow
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    // This route will handle the Google OAuth callback
    return req.user;
  }
}
