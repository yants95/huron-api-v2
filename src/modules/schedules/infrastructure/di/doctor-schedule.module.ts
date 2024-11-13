import { CreateDoctorScheduleCommandHandler } from "#/modules/schedules/application/cqrs/commands/doctor-schedule/create-doctor-schedule.command-handler";
import { MongoDBDoctorScheduleModel, MongoDBDoctorScheduleModelSchema } from "#/modules/schedules/infrastructure/db/models/mongodb/mongodb-doctor-schedule.model";
import { schedulesProviders } from "#/modules/schedules/infrastructure/di/doctor-schedule.provider";
import { CreateDoctorScheduleController } from "#/modules/schedules/infrastructure/http/controllers/create-doctor-schedule.controller";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: MongoDBDoctorScheduleModel.name,
        schema: MongoDBDoctorScheduleModelSchema
      }
    ])
  ],
  controllers: [CreateDoctorScheduleController],
  providers: [
    ...schedulesProviders,
    CreateDoctorScheduleCommandHandler,
  ],
  exports: [...schedulesProviders]
})
export class ScheduleModule {}