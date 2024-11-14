import { Mapper } from "#/core/domain/entities/mapper";
import { Injectable } from "@nestjs/common";
import { DoctorScheduleModel, doctorScheduleSchema } from "#/modules/schedules/infrastructure/db/models/doctor-schedule.model";
import { DoctorSchedule } from "#/modules/schedules/domain/entities/doctor-schedule";
import { DoctorScheduleId } from "#/modules/schedules/domain/value-objects/doctor-schedule-id";
import { DoctorId } from "#/modules/user/domain/value-objects/doctor-id";
import { DoctorScheduleStatus } from "#/modules/schedules/domain/enum/doctor-schedule-status.enum";

@Injectable()
export class DoctorScheduleMapper implements Mapper<DoctorSchedule, DoctorScheduleModel> {
  public toPersist(entity: DoctorSchedule): DoctorScheduleModel {
    const doctorSchedule = entity.getPropsCopy();
    const data: DoctorScheduleModel = {
      id: doctorSchedule.id.toString(),
      doctorId: doctorSchedule.doctorId.toString(),
      date: doctorSchedule.date,
      time: doctorSchedule.time,
      status: doctorSchedule.status,
      createdAt: doctorSchedule.createdAt,
      updatedAt: doctorSchedule.updatedAt,
      bookedAt: doctorSchedule.bookedAt
    };
    doctorScheduleSchema.parse(data);
    return data;
  }

  public toDomain(record: DoctorScheduleModel): DoctorSchedule {
    return DoctorSchedule.restore({
      id: DoctorScheduleId.create(record.id),
      props: {
        doctorId: DoctorId.create(record.doctorId),
        time: record.time,
        date: record.date,
        status: record.status as DoctorScheduleStatus,
        createdAt: record.createdAt,
        updatedAt: record.updatedAt,
        bookedAt: record.bookedAt
      },
    });
  }
}
