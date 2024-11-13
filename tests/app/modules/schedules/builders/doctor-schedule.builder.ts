import { Builder } from "!tests/app/modules/user/builders/builder";
import { CreateDoctorScheduleProps, DoctorSchedule } from "#/modules/schedules/domain/entities/doctor-schedule";
import { DoctorId } from "#/modules/user/domain/value-objects/doctor-id";
import { faker } from "@faker-js/faker";

export class DoctorScheduleBuilder extends Builder<CreateDoctorScheduleProps> {
  public constructor() {
    super({
      doctorId: DoctorId.create(faker.string.uuid()),
      date: "25/12/2024",
      time: "10:00"
    })
  }

  public build(): DoctorSchedule {
    return DoctorSchedule.create(this.getProps());
  }
}
