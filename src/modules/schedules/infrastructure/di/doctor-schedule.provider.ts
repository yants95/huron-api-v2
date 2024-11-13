import * as DoctorScheduleSymbols from "#/modules/schedules/infrastructure/di/doctor-schedule.di-token";
import { Provider } from "@nestjs/common";
import { MongoDBDoctorScheduleRepository } from "#/modules/schedules/infrastructure/db/repositories/mongodb-doctor-schedule.repository";
import { DoctorScheduleMapper } from "#/modules/schedules/infrastructure/db/mappers/doctor-schedule.mapper";

export const DoctorScheduleRepositoryProvider: Provider = {
  provide: DoctorScheduleSymbols.DoctorScheduleRepositorySymbol,
  useClass: MongoDBDoctorScheduleRepository
};

export const DoctorScheduleMapperProvider: Provider = {
  provide: DoctorScheduleSymbols.DoctorScheduleMapperSymbol,
  useClass: DoctorScheduleMapper
};

export const schedulesProviders: Provider[] = [
  DoctorScheduleRepositoryProvider,
  DoctorScheduleMapperProvider
]