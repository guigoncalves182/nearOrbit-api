import { IsString } from 'class-validator';
import { CreateAccountOnCurrentSeasonDTO } from './create-accout-on-current-season.dto';

export class CreateAccountDTO extends CreateAccountOnCurrentSeasonDTO {
  @IsString()
  readonly season: string;
}
