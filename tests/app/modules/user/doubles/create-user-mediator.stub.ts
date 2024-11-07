import { CreateAdminCommandHandlerStub } from "!tests/app/modules/user/doubles/create-admin-command-handler.stub";
import { CreateDoctorCommandHandlerStub } from "!tests/app/modules/user/doubles/create-doctor-command-handler.stub";
import { CreateSecretaryCommandHandlerStub } from "!tests/app/modules/user/doubles/create-secretary-command-handler.stub";
import { MediatorHandler } from "#/core/application/interfaces/mediator";
import { CreateUserMediator, CreateUserMediatorResult } from "#/modules/user/application/cqrs/commands/create-user.mediator";
import { UserType } from "#/modules/user/domain/enum/user-type";

type CreateUserMediatorStubResponse = CreateUserMediatorResult;

export class CreateUserMediatorStub extends CreateUserMediator {
  #response!: CreateUserMediatorStubResponse;

  constructor() {
    const adminHandler = new CreateAdminCommandHandlerStub();
    const doctorHandler = new CreateDoctorCommandHandlerStub();
    const secretaryHandler = new CreateSecretaryCommandHandlerStub();

    super(
      new Map<UserType, MediatorHandler>([
        [UserType.admin, adminHandler],
        [UserType.doctor, doctorHandler],
        [UserType.secretary, secretaryHandler],
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
