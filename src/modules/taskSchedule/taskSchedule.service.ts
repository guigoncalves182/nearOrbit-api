import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { AccountService } from "../account/account.service";

@Injectable()
export class TaskScheduleService {
  constructor(
    private accountService: AccountService,
  ) {}

   @Cron(CronExpression.EVERY_10_MINUTES)
   async schedule():Promise<void> {
    const energyAutoRefresh = Number(process.env.ENERGY_AUTO_REFRESH)
    const update = await this.accountService.refreshEnergyOnCurrentSeason(energyAutoRefresh)
    console.log(update)
  }
}
