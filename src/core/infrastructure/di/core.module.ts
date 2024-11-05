import { DATABASE_URI } from "#/core/infrastructure/configs/settings";
import { Global, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { CqrsModule } from "@nestjs/cqrs";
import { MongooseModule } from "@nestjs/mongoose";

export const mongooseModule = MongooseModule.forRootAsync({
  useFactory: () => ({
    uri: DATABASE_URI,
  }),
});

@Global()
@Module({
  imports: [
    CqrsModule.forRoot(),
    ConfigModule.forRoot({ load: [] }),
    mongooseModule
  ],
  providers: [ConfigService],
  exports: [ConfigService]
})
export class CoreModule {}