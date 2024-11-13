import { Builder } from "!tests/app/modules/user/builders/builder";
import { CreateDoctorScheduleCommand } from "#/modules/schedules/application/cqrs/commands/doctor-schedule/create-doctor-schedule.command";

import { faker } from "@faker-js/faker";

export class CreateDoctorScheduleCommandBuilder extends Builder<CreateDoctorScheduleCommand> {
  #props = {
    doctorId: faker.string.uuid(),
    schedules: [] as CreateDoctorScheduleCommand["schedules"],
  }

  public constructor() {
    super({
      doctorId: faker.string.uuid(),
      schedules: [] as CreateDoctorScheduleCommand["schedules"],
    })
  }

  public buildMany(schedules: number): this {
    for (let i = 0; i < schedules; i++) {
      this.#props.schedules.push({
        date: faker.date.anytime().toDateString(),
        time: faker.date.future().toDateString(),
      })
    }

    return this;
  }

  public build(): CreateDoctorScheduleCommand {
    return new CreateDoctorScheduleCommand(this.getProps());
  }
}
