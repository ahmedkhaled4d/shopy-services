import { IsEmail, IsNotEmpty } from 'class-validator';

export class ResetDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}

export class VerifyDto {
  @IsNotEmpty()
  code: number;
}
