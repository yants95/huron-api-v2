import { Admin, CreateAdminProps } from "#/modules/user/domain/entities/admin";
import { UserId } from "#/modules/user/domain/value-objects/user-id";
import { Ulid } from "#/core/domain/value-objects/ulid";

import { cpf } from "cpf-cnpj-validator";

export class CreateAdminBuilder {
  #props: CreateAdminProps = {
    userId: UserId.create(Ulid.new()),
    cpf: cpf.generate()
  }

  public build(): Admin {
    return Admin.create(this.#props)
  }
}
