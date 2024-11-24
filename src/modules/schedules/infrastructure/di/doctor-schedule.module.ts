import { PatientModule } from "#/modules/patient/infrastructure/di/patient.module";
import { CreateDoctorScheduleCommandHandler } from "#/modules/schedules/application/cqrs/commands/doctor-schedule/create-doctor-schedule.command-handler";
import { CreateScheduleCommandHandler } from "#/modules/schedules/application/cqrs/commands/schedule/create-schedule.command-handler";
import { MongoDBDoctorScheduleModel, MongoDBDoctorScheduleModelSchema } from "#/modules/schedules/infrastructure/db/models/mongodb/mongodb-doctor-schedule.model";
import { MongoDBScheduleModel, MongoDBScheduleModelSchema } from "#/modules/schedules/infrastructure/db/models/mongodb/mongodb-schedule.model";
import { schedulesProviders } from "#/modules/schedules/infrastructure/di/doctor-schedule.provider";
import { CreateDoctorScheduleController } from "#/modules/schedules/infrastructure/http/controllers/create-doctor-schedule.controller";
import { CreateGoogleListEventsController } from "#/modules/schedules/infrastructure/http/controllers/create-schedule-google-list-events.controller";
import { CreateGoogleScheduleController } from "#/modules/schedules/infrastructure/http/controllers/create-schedule-google.controller";
import { CreateScheduleController } from "#/modules/schedules/infrastructure/http/controllers/create-schedule.controller";
import { GoogleCalendarService } from "#/modules/schedules/infrastructure/http/services/google-calendar.service";
import { UserModule } from "#/modules/user/infrastructure/di/user.module";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: MongoDBDoctorScheduleModel.name,
        schema: MongoDBDoctorScheduleModelSchema
      },
      {
        name: MongoDBScheduleModel.name,
        schema: MongoDBScheduleModelSchema
      }
    ]),
    PatientModule,
    UserModule,
  ],
  controllers: [
    CreateDoctorScheduleController,
    CreateScheduleController,
    CreateGoogleScheduleController,
    CreateGoogleListEventsController
  ],
  providers: [
    ...schedulesProviders,
    CreateDoctorScheduleCommandHandler,
    CreateScheduleCommandHandler,
    GoogleCalendarService
  ],
  exports: [...schedulesProviders, GoogleCalendarService]
})
export class ScheduleModule {}