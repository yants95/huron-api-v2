import { CreateAdminCommandHandlerStub } from "!tests/app/modules/user/doubles/create-admin-command-handler.stub";
import { CreateDoctorCommandHandlerStub } from "!tests/app/modules/user/doubles/create-doctor-command-handler.stub";
import { CommandType } from "#/core/application/cqrs/command";
import { MediatorHandler } from "#/core/application/interfaces/mediator";
import { CreateUserMediator, CreateUserMediatorResult } from "#/modules/user/application/cqrs/commands/create-user.mediator";

type CreateUserMediatorStubResponse = CreateUserMediatorResult;

export class CreateUserMediatorStub extends CreateUserMediator {
  #response!: CreateUserMediatorStubResponse;

  constructor() {
    const adminHandler = new CreateAdminCommandHandlerStub();
    const doctorHandler = new CreateDoctorCommandHandlerStub();

    super(
      new Map<CommandType, MediatorHandler>([
        [CommandType.admin, adminHandler],
        [CommandType.doctor, doctorHandler],
      ]),
    );
  }

  async send(_command: unknown): Promise<CreateUserMediatorStubResponse> {
    return this.#response;
  }

  public addResponse(response: any): CreateUserMediatorStub {
    this.#response = response;
    return this;
  }
}
