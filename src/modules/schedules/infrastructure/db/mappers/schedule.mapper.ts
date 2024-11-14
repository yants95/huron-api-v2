import { Mapper } from "#/core/domain/entities/mapper";
import { PatientId } from "#/modules/patient/domain/value-objects/patient-id";
import { Schedule } from "#/modules/schedules/domain/entities/schedule";
import { DoctorScheduleId } from "#/modules/schedules/domain/value-objects/doctor-schedule-id";
import { ScheduleId } from "#/modules/schedules/domain/value-objects/schedule-id";
import { ScheduleModel, scheduleSchema } from "#/modules/schedules/infrastructure/db/models/schedule.model";
import { DoctorId } from "#/modules/user/domain/value-objects/doctor-id";
import { Injectable } from "@nestjs/common";


@Injectable()
export class ScheduleMapper implements Mapper<Schedule, ScheduleModel> {
  public toPersist(entity: Schedule): ScheduleModel {
    const doctorSchedule = entity.getPropsCopy();
    const data: ScheduleModel = {
      id: doctorSchedule.id.toString(),
      doctorId: doctorSchedule.doctorId.toString(),
      patientId: doctorSchedule.patientId.toString(),
      doctorScheduleId: doctorSchedule.doctorScheduleId.toString(),
      createdAt: doctorSchedule.createdAt,
    };
    scheduleSchema.parse(data);
    return data;
  }

  public toDomain(record: ScheduleModel): Schedule {
    return Schedule.restore({
      id: ScheduleId.create(record.id),
      props: {
        doctorId: DoctorId.create(record.doctorId),
        patientId: PatientId.create(record.patientId),
        doctorScheduleId: DoctorScheduleId.create(record.doctorScheduleId),
        createdAt: record.createdAt,
      },
    });
  }
}
