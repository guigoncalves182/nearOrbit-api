import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, UpdateWriteOpResult } from 'mongoose';
import { Account } from './schemas/account.schema';
import { CreateAccountOnCurrentSeasonDTO } from './dto/create-accout-on-current-season.dto';
import { SeasonService } from '../season/season.service';
import { UserService } from '../user/user.service';
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
      season: currentSeason._id,
    });

    return await this.userService.addAccount(userId, account._id);
  }

  async createAccount(createAccountDTO: CreateAccountDTO): Promise<Account> {
    return await this.accountModel.create(createAccountDTO);
  }

  async refreshEnergyOnCurrentSeason(energy: number): Promise<UpdateWriteOpResult> {  
    const currentSeason = await this.seasonService.findCurrentSeason();
    const maxEnergy = Number(process.env.MAX_ENERGY)

    if (!currentSeason)
        throw new HttpException(
            'Season not found',
            HttpStatus.INTERNAL_SERVER_ERROR,
        );

    return await this.accountModel.updateMany(
        { season: currentSeason._id },
        [{$set: {energy: {$min: [{ $add: ["$energy", energy] }, maxEnergy]}}}]
    );
}
}
