import { MediatorHandler } from "#/core/application/interfaces/mediator";
import { Either, left, right } from "#/core/types/either";
import { CreateDoctorCommand } from "#/modules/user/application/cqrs/commands/create-doctor/create-doctor.command";
import { DoctorAlreadyExistsError } from "#/modules/user/application/errors/doctor-already-exists.error";
import { Doctor } from "#/modules/user/domain/entities/doctor";
import { DoctorRepository } from "#/modules/user/domain/repositories/doctor.repository";
import { UserId } from "#/modules/user/domain/value-objects/user-id";
import { DoctorRepositorySymbol } from "#/modules/user/infrastructure/di/user.di-token";
import { Inject, Injectable } from "@nestjs/common";

export type CreateDoctorCommandResult = Either<DoctorAlreadyExistsError, void>;

@Injectable()
export class CreateDoctorCommandHandler implements MediatorHandler {
  public constructor(
    @Inject(DoctorRepositorySymbol)
    private readonly doctorsRepository: DoctorRepository,
  ) {}

  async handle(command: CreateDoctorCommand): Promise<CreateDoctorCommandResult> {
    const foundDoctor = await Promise.all([
      this.doctorsRepository.findByCRM(command.crm),
      this.doctorsRepository.findByDocument(command.document)
    ]);
    if (foundDoctor) return left(DoctorAlreadyExistsError.create());
    const doctor = Doctor.create({
      ...command,
      userId: UserId.create(command.userId)
    });
    await this.doctorsRepository.insert(doctor);

    return right(undefined);
  }
}