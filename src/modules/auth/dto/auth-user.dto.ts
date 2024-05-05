import { IsEmail, IsString } from 'class-validator';

export class AuthUserDTO {
  @IsString()
  readonly password: string;

  @IsEmail()
  readonly email: string;
}
