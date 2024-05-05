import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Account } from './schemas/account.schema';
import { CreateAccountDTO } from './dto/create-accout-dto';
import { SeasonService } from '../season/season.service';
import { UserService } from '../user/user.service';
import { User } from '../user/schemas/user.schema';

@Injectable()
export class AccountService {
  constructor(
    @InjectModel(Account.name)
    private accountModel: Model<Account>,
    private seasonService: SeasonService,
    private userService: UserService,
  ) {}

  async findAll(): Promise<Account[]> {
    return await this.accountModel.find();
  }

  async createUserAccountOnCurrentSeason(
    userId: string,
    createAccountDTO: CreateAccountDTO,
  ): Promise<boolean> {
    //find user or throw exepction
    const foundUser = await this.userService.findOne(userId);
    if (!foundUser)
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);

    // find current season
    const currentSeason = await this.seasonService.findCurrentSeason();
    if (!currentSeason)
      throw new HttpException(
        'Season not found',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

    const { id: currentSeasonid } = currentSeason;

    // create Account
    const account = await this.accountModel.create({
      ...createAccountDTO,
      season: currentSeasonid,
    });

    // add account to user
    const didItBound = await this.userService.addAccount(userId, account.id);

    return didItBound;
  }
}
