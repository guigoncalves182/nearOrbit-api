import { IsMongoId, IsNumber, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateAccountDTO {
  @IsNumber()
  readonly power: number;

  @IsNumber()
  readonly speed: number;

  @IsNumber()
  readonly maneuver: number;
}
