import { CoreModule } from '#/core/infrastructure/di/core.module';
import { PatientModule } from '#/modules/patient/infrastructure/di/patient.module';
import { ScheduleModule } from '#/modules/schedules/infrastructure/di/doctor-schedule.module';
import { UserModule } from '#/modules/user/infrastructure/di/user.module';

import { Module } from '@nestjs/common';

@Module({
  imports: [CoreModule, UserModule, PatientModule, ScheduleModule],
})
export class AppModule {}
