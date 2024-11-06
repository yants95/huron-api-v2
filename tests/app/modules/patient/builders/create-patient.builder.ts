import { Builder } from "!tests/app/modules/user/builders/builder";
import { Ulid } from "#/core/domain/value-objects/ulid";
import { CreatePatientProps, Patient } from "#/modules/patient/domain/entities/patient";
import { PatientId } from "#/modules/patient/domain/value-objects/patient-id";
import { faker } from "@faker-js/faker";
import { cpf } from "cpf-cnpj-validator";

export class CreatePatientBuilder extends Builder<CreatePatientProps> {
  public constructor() {
    super({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      age: faker.number.int(),
      weight: faker.number.int.toString(),
      height: faker.number.int.toString(),
      document: cpf.generate(),
      gender: faker.person.gender(),
      phone: faker.phone.number(),
      cep: faker.number.int().toString(),
      address: faker.string.alpha(),
      birthDate: faker.number.int.toString(),
    })
  }

  public build(): Patient {
    return Patient.restore({
      id: PatientId.create(Ulid.new()),
      props: {
        ...this.getProps(),
        createdAt: new Date()
      }
    });
  }
}
