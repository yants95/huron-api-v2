import { CreatePatientCommand } from "#/modules/patient/application/cqrs/commands/create-patient/create-patient.command";
import { faker } from "@faker-js/faker";
import { cpf } from "cpf-cnpj-validator";

export class CreatePatientCommandBuilder {
  #props = {
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
  };

  public withDocument(document: string): this {
    this.#props.document = document;
    return this;
  }

  public build(): CreatePatientCommand {
    return new CreatePatientCommand(this.#props);
  }
}
