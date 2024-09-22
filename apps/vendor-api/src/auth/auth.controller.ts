import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import { AuthToken } from './dto/Auth';
import { ResetDto, VerifyDto } from './dto/recovery.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @Post('signin')
  async signIn(@Body() signInDto: SignInDto): Promise<AuthToken> {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Post('refresh')
  async refreshToken(@Body() refreshTokenDto: { refreshToken: string }) {
    return this.authService.refreshToken(refreshTokenDto.refreshToken);
  }

  @Post('recovery/reset')
  async resetOTP(@Body() resetDTO: ResetDto) {
    await this.authService.recoverReset(resetDTO);
    return { message: 'If the email exists, a recovery link has been sent.' };
  }

  @Post('recovery/verify')
  async verifyOTP(@Body() verifyDto: VerifyDto): Promise<AuthToken> {
    return await this.authService.recoverVerify(verifyDto);
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

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  // @Get('google')
  // @UseGuards(AuthGuard('google'))
  // googleAuth() {
  //   // This route will initiate the Google OAuth flow
  // }

  // @Get('google/callback')
  // @UseGuards(AuthGuard('google'))
  // googleAuthRedirect(@Req() req) {
  //   // This route will handle the Google OAuth callback
  //   return req.vendor;
  // }
}
