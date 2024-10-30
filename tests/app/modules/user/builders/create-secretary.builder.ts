import { UserId } from "#/modules/user/domain/value-objects/user-id";
import { Ulid } from "#/core/domain/value-objects/ulid";

import { cpf } from "cpf-cnpj-validator";
import { Builder } from "!tests/app/modules/user/builders/builder";
import { SecretaryProps } from "#/modules/user/domain/entities/secretary";

export class CreateSecretaryBuilder extends Builder<SecretaryProps>  {
  constructor() {
    super({
      userId: UserId.create(Ulid.new()),
      document: cpf.generate(),
      createdAt: new Date()
    });
  }

  public build(): SecretaryProps {
    return this.getProps();
  }
}
