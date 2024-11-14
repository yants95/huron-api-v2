import { Mapper } from "#/core/domain/entities/mapper";
import { MongoRepository } from "#/core/infrastructure/db/mongodb/mongodb-repository.base";
import { Schedule } from "#/modules/schedules/domain/entities/schedule";
import { ScheduleRepository } from "#/modules/schedules/domain/repositories/schedule.repository";
import { MongoDBScheduleModel } from "#/modules/schedules/infrastructure/db/models/mongodb/mongodb-schedule.model";
import { ScheduleModel } from "#/modules/schedules/infrastructure/db/models/schedule.model";
import { ScheduleMapperSymbol } from "#/modules/schedules/infrastructure/di/doctor-schedule.di-token";
import { Inject, Injectable } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connection, Model } from "mongoose";

@Injectable()
export class MongoDBScheduleRepository
  extends MongoRepository<Schedule, MongoDBScheduleModel>
  implements ScheduleRepository
{
  constructor(
    @Inject(ScheduleMapperSymbol)
    protected readonly mapper: Mapper<Schedule, ScheduleModel>,
    @InjectModel(MongoDBScheduleModel.name)
    protected readonly scheduleModel: Model<MongoDBScheduleModel>,
    @InjectConnection() connection: Connection,
  ) {
    super(mapper, scheduleModel, connection);
  }

  public async findByPatientAndDoctorId(patientId: string, doctorId: string): Promise<Schedule | null> {
    const schedule = await this.scheduleModel.findOne({ patientId, doctorId });
    return schedule ? this.mapper.toDomain(schedule) : null;
  }
}
