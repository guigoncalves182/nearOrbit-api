import { Module } from "@nestjs/common";
import { TaskScheduleService } from "./taskSchedule.service";
import { AccountService } from "../account/account.service";
import { AccountModule } from "../account/account.module";

@Module({
  imports: [AccountModule],
  controllers: [],
  providers: [TaskScheduleService],
  exports: [],
})
export class TaskScheduleModule {}

