import { IsString } from 'class-validator';

export class UpdateUserDTO {
  @IsString()
  readonly fullName: string;

  @IsString()
  readonly password: string;

  @IsString({ each: true })
  readonly account: string[];
}
