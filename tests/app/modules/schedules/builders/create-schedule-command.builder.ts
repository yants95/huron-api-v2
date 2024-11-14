import { Builder } from "!tests/app/modules/user/builders/builder";
import { CreateScheduleCommand } from "#/modules/schedules/application/cqrs/commands/schedule/create-schedule.command";

import { faker } from "@faker-js/faker";

export class CreateScheduleCommandBuilder extends Builder<CreateScheduleCommand> {
  public constructor() {
    super({
      doctorId: faker.string.uuid(),
      patientId: faker.string.uuid(),
      doctorScheduleId: faker.string.uuid(),
    })
  }

  public build(): CreateScheduleCommand {
    return new CreateScheduleCommand(this.getProps());
  }
}
