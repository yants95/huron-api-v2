import { Mapper } from "#/core/domain/entities/mapper";
import { MongoRepository } from "#/core/infrastructure/db/mongodb/mongodb-repository.base";
import { DoctorSchedule } from "#/modules/schedules/domain/entities/doctor-schedule";
import { DoctorScheduleRepository, SchedulesFilterProps } from "#/modules/schedules/domain/repositories/doctor-schedule.repository";
import { DoctorScheduleModel } from "#/modules/schedules/infrastructure/db/models/doctor-schedule.model";
import { MongoDBDoctorScheduleModel } from "#/modules/schedules/infrastructure/db/models/mongodb/mongodb-doctor-schedule.model";
import { DoctorScheduleMapperSymbol } from "#/modules/schedules/infrastructure/di/doctor-schedule.di-token";
import { Inject, Injectable } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connection, Model } from "mongoose";

@Injectable()
export class MongoDBDoctorScheduleRepository
  extends MongoRepository<DoctorSchedule, MongoDBDoctorScheduleModel>
  implements DoctorScheduleRepository
{
  constructor(
    @Inject(DoctorScheduleMapperSymbol)
    protected readonly mapper: Mapper<DoctorSchedule, DoctorScheduleModel>,
    @InjectModel(MongoDBDoctorScheduleModel.name)
    protected readonly doctorScheduleModel: Model<MongoDBDoctorScheduleModel>,
    @InjectConnection() connection: Connection,
  ) {
    super(mapper, doctorScheduleModel, connection);
  }

  public async findDoctorSchedule(filters: SchedulesFilterProps): Promise<DoctorSchedule[]> {
    const schedules = await this.doctorScheduleModel.find({
      "doctorId": filters.doctorId,
      "date": { $in: filters.schedules.map((schedule) => schedule.date) },
      "time": { $in: filters.schedules.map((schedule) => schedule.time) }
    });
    return schedules.map(this.mapper.toDomain);
  }
}
