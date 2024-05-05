import { IsEmail, IsString } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  readonly fullName: string;

  @IsString()
  readonly password: string;

  @IsEmail()
  readonly email: string;
}
