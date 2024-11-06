import { CreatePatientCommandBuilder } from "!tests/app/modules/patient/builders/create-patient-command.builder";
import { CreatePatientBuilder } from "!tests/app/modules/patient/builders/create-patient.builder";
import { InMemoryPatientRepository } from "!tests/app/modules/patient/doubles/in-memory-patient-repository";
import { CreatePatientCommandHandler } from "#/modules/patient/application/cqrs/commands/create-patient/create-patient.command-handler";

interface Sut {
  sut: CreatePatientCommandHandler;
  patientsRepository: InMemoryPatientRepository;
}

const makeSut = (): Sut => {
  const patientsRepository = new InMemoryPatientRepository();
  const sut = new CreatePatientCommandHandler(patientsRepository);

  return { sut, patientsRepository };
}

describe("CreatePatientCommandHandler", () => {
  it("should be able to create patient successfully successfully", async () => {
    const { sut, patientsRepository } = makeSut();
    const command = new CreatePatientCommandBuilder().build();

    const result = await sut.execute(command);

    const persistedPatient = await patientsRepository.findByDocument(command.document);
    expect(result.isRight()).toBeTruthy();
    expect(persistedPatient).toBeDefined();
  });

  it("should throw PatientAlreadyExistsError when creating patient that already exists", async () => {
    const { sut, patientsRepository } = makeSut();
    const patient = new CreatePatientBuilder().build();
    const command = new CreatePatientCommandBuilder()
      .withDocument(patient.getPropsCopy().document)
      .build();
    patientsRepository.items.push(patient);

    const result = await sut.execute(command);

    expect(result.isLeft()).toBeTruthy();
  });
})