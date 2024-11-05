import { AdminProps } from "#/modules/user/domain/entities/admin";
import { UserId } from "#/modules/user/domain/value-objects/user-id";
import { Ulid } from "#/core/domain/value-objects/ulid";

import { cpf } from "cpf-cnpj-validator";
import { Builder } from "!tests/app/modules/user/builders/builder";

export class CreateAdminBuilder extends Builder<AdminProps>  {
  constructor() {
    super({
      userId: UserId.create(Ulid.new()),
      document: cpf.generate(),
      createdAt: new Date()
    });
  }

  public build(): AdminProps {
    return this.getProps();
  }
}
