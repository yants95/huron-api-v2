import { CreateUserProps, User } from "#/modules/user/domain/entities/user";
import { UserType } from "#/modules/user/domain/enum/user-type";
import { UserStatus } from "#/modules/user/domain/enum/user-status";
import { faker } from "@faker-js/faker";

export class CreateUserBuilder {
  #props: CreateUserProps = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    type: UserType.admin,
    status: UserStatus.enabled,
    password: faker.internet.password()
  }

  public build(): User {
    return User.create(this.#props)
  }
}
