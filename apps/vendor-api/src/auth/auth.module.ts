import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DatabaseModule, UserRepository } from '@app/database';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || '',
      signOptions: { expiresIn: process.env.JWT_EXPIRATION || '15m' },
    }),
    DatabaseModule,
  ],
  providers: [AuthService, JwtStrategy, UserRepository],
  controllers: [AuthController],
})
export class AuthModule {}
