
import { InMemoryAdminRepository } from "!tests/app/modules/user/doubles/in-memory-admin-repository";
import { MediatorHandler } from "#/core/application/interfaces/mediator";
import { right } from "#/core/types/either";
import { CreateAdminCommand } from "#/modules/user/application/cqrs/commands/create-admin/create-admin.command";
import { CreateAdminCommandHandler, CreateAdminCommandResult } from "#/modules/user/application/cqrs/commands/create-admin/create-admin.command-handler";

export type CreateAdminCommandHandlerStubResponse = CreateAdminCommandResult;

export class CreateAdminCommandHandlerStub extends CreateAdminCommandHandler implements MediatorHandler
{
  public constructor() {
    super(new InMemoryAdminRepository());
  }

  async handle(_props: CreateAdminCommand): Promise<CreateAdminCommandHandlerStubResponse> {
    return right(undefined);
  }
}
