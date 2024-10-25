import { CreateUserCommand } from "#/modules/user/application/cqrs/commands/create-user.command";
import { faker } from "@faker-js/faker";

export class CreateUserCommandBuilder {
  #props: CreateUserCommand = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  }

  public withEmail(email: string): this {
    this.#props.email = email;
    return this;
  }

  public build(): CreateUserCommand {
    return new CreateUserCommand(
      this.#props.name,
      this.#props.email,
      this.#props.password
    );
  }
}
