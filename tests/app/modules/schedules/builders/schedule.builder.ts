import { Builder } from "!tests/app/modules/user/builders/builder";
import { Ulid } from "#/core/domain/value-objects/ulid";
import { PatientId } from "#/modules/patient/domain/value-objects/patient-id";
import { Schedule, ScheduleProps } from "#/modules/schedules/domain/entities/schedule";
import { DoctorScheduleId } from "#/modules/schedules/domain/value-objects/doctor-schedule-id";
import { ScheduleId } from "#/modules/schedules/domain/value-objects/schedule-id";
import { DoctorId } from "#/modules/user/domain/value-objects/doctor-id";

export class ScheduleBuilder extends Builder<ScheduleProps> {
  public constructor() {
    super({
      doctorId: DoctorId.create(Ulid.new()),
      patientId: PatientId.create(Ulid.new()),
      doctorScheduleId: DoctorScheduleId.create(Ulid.new()),
      createdAt: new Date()
    })
  }

  public build(): Schedule {
    return Schedule.restore({
      id: ScheduleId.create(Ulid.new()),
      props: this.getProps()
    });
  }
}

