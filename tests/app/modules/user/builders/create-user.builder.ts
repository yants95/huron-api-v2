import { Builder } from "!tests/app/modules/user/builders/builder";
import { CreateUserProps, User } from "#/modules/user/domain/entities/user";
import { UserType } from "#/modules/user/domain/enum/user-type";
import { faker } from "@faker-js/faker";

export class CreateUserBuilder extends Builder<CreateUserProps> {
  public constructor() {
    super({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      type: UserType.admin
    })
  }

  public build(): User {
    return User.create(this.getProps());
  }
}
