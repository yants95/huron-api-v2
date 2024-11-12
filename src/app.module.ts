import { CoreModule } from '#/core/infrastructure/di/core.module';
import { PatientModule } from '#/modules/patient/infrastructure/di/patient.module';
import { UserModule } from '#/modules/user/infrastructure/di/user.module';

import { Module } from '@nestjs/common';

@Module({
  imports: [CoreModule, UserModule, PatientModule],
})
export class AppModule {}
