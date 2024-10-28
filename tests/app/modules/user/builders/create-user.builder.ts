import { CreateUserProps, User } from "#/modules/user/domain/entities/user";
import { faker } from "@faker-js/faker";

export class CreateUserBuilder {
  #props: CreateUserProps = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  }

  public build(): User {
    return User.create(this.#props)
  }
}
