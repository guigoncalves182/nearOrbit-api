import { IsNumber, IsString } from 'class-validator';

export class CreateAccountOnCurrentSeasonDTO {
  @IsNumber()
  readonly power: number;

  @IsNumber()
  readonly speed: number;

  @IsNumber()
  readonly maneuver: number;
}
