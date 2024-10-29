import { Builder } from "!tests/app/modules/user/builders/builder";
import { CreateUserCommand, UserCommandProps } from "#/modules/user/application/cqrs/commands/create-user/create-user.command";
import { faker } from "@faker-js/faker";

export class CreateUserCommandBuilder extends Builder<UserCommandProps> {
  public constructor() {
    super({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    });
  }

  public build(): CreateUserCommand {
    return new CreateUserCommand(this.getProps());
  }
}
