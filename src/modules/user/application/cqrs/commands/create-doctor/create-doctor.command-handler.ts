import { ApplicationError } from "#/core/application/errors/application.error.base";
import { MediatorHandler } from "#/core/application/interfaces/mediator";
import { Either, right } from "#/core/types/either";
import { CreateDoctorCommand } from "#/modules/user/application/cqrs/commands/create-doctor/create-doctor.command";
import { Doctor } from "#/modules/user/domain/entities/doctor";
import { DoctorRepository } from "#/modules/user/domain/repositories/doctor.repository";
import { DoctorRepositorySymbol } from "#/modules/user/infrastructure/di/user.di-token";
import { Inject, Injectable } from "@nestjs/common";

export type CreateDoctorCommandResult = Either<ApplicationError, void>;

@Injectable()
export class CreateDoctorCommandHandler implements MediatorHandler {
  public constructor(
    @Inject(DoctorRepositorySymbol)
    private readonly doctorsRepository: DoctorRepository,
  ) {}

  async handle(command: CreateDoctorCommand): Promise<CreateDoctorCommandResult> {
    const doctor = Doctor.create(command.props);
    await this.doctorsRepository.insert(doctor);

    return right(undefined);
  }
}