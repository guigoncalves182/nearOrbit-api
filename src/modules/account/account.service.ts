import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Account } from './schemas/account.schema';
import { CreateAccountOnCurrentSeasonDTO } from './dto/create-accout-on-current-season.dto';
import { SeasonService } from '../season/season.service';
import { UserService } from '../user/user.service';
import { IAccount } from './interfaces/account.interface';
import { CreateAccountDTO } from './dto/create-accout.dto';

@Injectable()
export class AccountService {
  constructor(
    @InjectModel(Account.name)
    private accountModel: Model<Account>,
    private seasonService: SeasonService,
    private userService: UserService,
  ) {}

  async createUserAccountOnCurrentSeason(
    createAccountOnCurrentSeasonDTO: CreateAccountOnCurrentSeasonDTO,
    userId: string,
  ): Promise<boolean> {
    const foundUser = await this.userService.findOne(userId);
    if (!foundUser)
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);

    const currentSeason = await this.seasonService.findCurrentSeason();
    if (!currentSeason)
      throw new HttpException(
        'Season not found',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

    const account = await this.createAccount({
      ...createAccountOnCurrentSeasonDTO,
      season: currentSeason.id,
    });

    return await this.userService.addAccount(userId, account.id);
  }

  async createAccount(createAccountDTO: CreateAccountDTO): Promise<IAccount> {
    return await this.accountModel.create(createAccountDTO);
  }
}
