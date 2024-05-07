import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Account } from './schemas/account.schema';
import { AccountService } from './account.service';
import { CreateAccountOnCurrentSeasonDTO } from './dto/create-accout-on-current-season.dto';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post(':userId')
  async createAccountOnCurrentSeason(
    @Body() createAccountDTO: CreateAccountOnCurrentSeasonDTO,
    @Param('userId') userId: string,
  ): Promise<boolean> {
    return await this.accountService.createUserAccountOnCurrentSeason(
      createAccountDTO,
      userId,
    );
  }
}
