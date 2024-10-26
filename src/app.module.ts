import { CoreModule } from '#/core/infrastructure/di/core.module';
import { UserModule } from '#/modules/user/infrastructure/di/user.module';

import { Module } from '@nestjs/common';

@Module({
  imports: [CoreModule, UserModule],
})
export class AppModule {}
