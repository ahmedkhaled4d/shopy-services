import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DatabaseModule, VendorRepository } from '@app/database';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    // PassportModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || '',
      signOptions: { expiresIn: process.env.JWT_EXPIRATION || '15m' },
    }),
    DatabaseModule,
  ],
  providers: [AuthService, VendorRepository],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
