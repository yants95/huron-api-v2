import { CommandType } from "#/core/application/cqrs/command";
import { CreateUserCommand } from "#/modules/user/application/cqrs/commands/create-user.command";
import { faker } from "@faker-js/faker";

export class CreateUserCommandBuilder {
  #props: CreateUserCommand = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    type: CommandType.admin
  }

  public with<T>(param: keyof CreateUserCommand, value: T): this {
    this.#props[param] = value as never;
    return this;
  }

  public build(): CreateUserCommand {
    return new CreateUserCommand(
      this.#props.name,
      this.#props.email,
      this.#props.password,
      undefined,
      undefined,
      this.#props.admin
    );
  }
}
