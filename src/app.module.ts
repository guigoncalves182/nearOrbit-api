import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { AccountModule } from './modules/account/account.module';
import { SeasonModule } from './modules/season/season.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.CONN_STRING),
    UserModule,
    AuthModule,
    AccountModule,
    SeasonModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
