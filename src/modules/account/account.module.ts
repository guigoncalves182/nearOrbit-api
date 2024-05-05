import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Account, AccountSchema } from './schemas/account.schema';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { SeasonModule } from '../season/season.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Account.name, schema: AccountSchema }]),
    SeasonModule,
    UserModule
  ],
  controllers: [AccountController],
  providers: [AccountService],
  exports: [],
})
export class AccountModule {}
