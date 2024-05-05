import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Account } from './schemas/account.schema';
import { AccountService } from './account.service';
import { CreateAccountDTO } from './dto/create-accout-dto';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get()
  findAll(): Promise<Account[]> {
    return this.accountService.findAll();
  }

  @Post(':userId')
  async createAccountOnCurrentSeason(
    @Body() createAccountDTO: CreateAccountDTO,
    @Param('userId') userId: string,
  ): Promise<boolean> {
    return await this.accountService.createUserAccountOnCurrentSeason(
      userId,
      createAccountDTO,
    );
  }
}
