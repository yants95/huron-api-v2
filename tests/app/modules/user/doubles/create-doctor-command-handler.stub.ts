import { InMemoryDoctorRepository } from "!tests/app/modules/user/doubles/in-memory-doctor-repository";
import { MediatorHandler } from "#/core/application/interfaces/mediator";
import { right } from "#/core/types/either";
import { CreateDoctorCommand } from "#/modules/user/application/cqrs/commands/create-doctor/create-doctor.command";
import { CreateDoctorCommandHandler, CreateDoctorCommandResult } from "#/modules/user/application/cqrs/commands/create-doctor/create-doctor.command-handler";

export type CreateDoctorCommandHandlerStubResponse = CreateDoctorCommandResult;

export class CreateDoctorCommandHandlerStub extends CreateDoctorCommandHandler implements MediatorHandler
{
  public constructor() {
    super(new InMemoryDoctorRepository());
  }

  async handle(_props: CreateDoctorCommand): Promise<CreateDoctorCommandHandlerStubResponse> {
    return right(undefined);
  }
}
