import * as DoctorScheduleSymbols from "#/modules/schedules/infrastructure/di/doctor-schedule.di-token";
import { Provider } from "@nestjs/common";
import { MongoDBDoctorScheduleRepository } from "#/modules/schedules/infrastructure/db/repositories/mongodb-doctor-schedule.repository";
import { DoctorScheduleMapper } from "#/modules/schedules/infrastructure/db/mappers/doctor-schedule.mapper";
import { MongoDBScheduleRepository } from "#/modules/schedules/infrastructure/db/repositories/mongodb-schedule.repository";
import { ScheduleMapper } from "#/modules/schedules/infrastructure/db/mappers/schedule.mapper";

export const DoctorScheduleRepositoryProvider: Provider = {
  provide: DoctorScheduleSymbols.DoctorScheduleRepositorySymbol,
  useClass: MongoDBDoctorScheduleRepository
};

export const DoctorScheduleMapperProvider: Provider = {
  provide: DoctorScheduleSymbols.DoctorScheduleMapperSymbol,
  useClass: DoctorScheduleMapper
};

export const ScheduleRepositoryProvider: Provider = {
  provide: DoctorScheduleSymbols.ScheduleRepositorySymbol,
  useClass: MongoDBScheduleRepository
};

export const ScheduleMapperProvider: Provider = {
  provide: DoctorScheduleSymbols.ScheduleMapperSymbol,
  useClass: ScheduleMapper
};

export const schedulesProviders: Provider[] = [
  DoctorScheduleRepositoryProvider,
  DoctorScheduleMapperProvider,
  ScheduleRepositoryProvider,
  ScheduleMapperProvider
]