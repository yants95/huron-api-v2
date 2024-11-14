import { UserId } from "#/modules/user/domain/value-objects/user-id";
import { Ulid } from "#/core/domain/value-objects/ulid";

import { cpf } from "cpf-cnpj-validator";
import { Doctor, DoctorProps } from "#/modules/user/domain/entities/doctor";
import { faker } from "@faker-js/faker";
import { Builder } from "!tests/app/modules/user/builders/builder";
import { DoctorId } from "#/modules/user/domain/value-objects/doctor-id";

export class CreateDoctorBuilder extends Builder<DoctorProps> {
  constructor() {
    super({
      userId: UserId.create(Ulid.new()),
      document: cpf.generate(),
      crm: faker.string.alphanumeric(),
      specialty: faker.string.alphanumeric(),
      createdAt: new Date()
    })
  }

  public build(): DoctorProps {
    return this.getProps();
  }
}

export class DoctorBuilder extends Builder<DoctorProps> {
  constructor() {
    super({
      userId: UserId.create(Ulid.new()),
      document: cpf.generate(),
      crm: faker.string.alphanumeric(),
      specialty: faker.string.alphanumeric(),
      createdAt: new Date(),
      updatedAt: new Date()
    })
  }

  public build(): Doctor {
    return Doctor.restore({
      id: DoctorId.create(Ulid.new()),
      props: this.getProps()
    })
  }
}