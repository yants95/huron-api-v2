import { Either, left, right } from "#/core/types/either";
import { CreatePatientCommand } from "#/modules/patient/application/cqrs/commands/create-patient/create-patient.command";
import { PatientAlreadyExistsError } from "#/modules/patient/application/errors/patient-already-exists.error";
import { Patient } from "#/modules/patient/domain/entities/patient";
import { PatientRepository } from "#/modules/patient/domain/repositories/patient.repository";
import { PatientRepositorySymbol } from "#/modules/patient/infrastructure/di/patient.di-token";

import { Inject, Injectable } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";

export type CreatePatientCommandResult = Either<PatientAlreadyExistsError, void>;

@Injectable()
@CommandHandler(CreatePatientCommand)
export class CreatePatientCommandHandler implements ICommandHandler<CreatePatientCommand> {
  public constructor(
    @Inject(PatientRepositorySymbol)
    private readonly patientsRepository: PatientRepository,
  ) {}

  async execute(command: CreatePatientCommand): Promise<CreatePatientCommandResult> {
    console.log("COMMAND", command);
    const foundPatient = await this.patientsRepository.findByDocument(command.document);
    if (foundPatient) return left(PatientAlreadyExistsError.create());
    const patient = Patient.create(command);
    await this.patientsRepository.insert(patient);

    return right(undefined);
  }
}