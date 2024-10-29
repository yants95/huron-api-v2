import { UserId } from "#/modules/user/domain/value-objects/user-id";
import { Ulid } from "#/core/domain/value-objects/ulid";

import { cpf } from "cpf-cnpj-validator";
import { CreateDoctorProps, Doctor } from "#/modules/user/domain/entities/doctor";
import { faker } from "@faker-js/faker";

export class CreateDoctorBuilder {
  #props: CreateDoctorProps = {
    userId: UserId.create(Ulid.new()),
    document: cpf.generate(),
    crm: faker.string.alphanumeric(),
    specialty: faker.string.alphanumeric(),
  }

  public build(): Doctor {
    return Doctor.create(this.#props)
  }
}
