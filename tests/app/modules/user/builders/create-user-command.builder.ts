import { CreateUserCommand, UserCommandProps } from "#/modules/user/application/cqrs/commands/create-user/create-user.command";
import { faker } from "@faker-js/faker";

export class CreateUserCommandBuilder {
  #props: UserCommandProps = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };

  public with<T>(param: keyof UserCommandProps, value: T): this {
    this.#props[param] = value as never;
    return this;
  }

  public build(): CreateUserCommand {
    return new CreateUserCommand(this.#props);
  }
}
