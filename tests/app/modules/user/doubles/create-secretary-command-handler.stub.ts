import { InMemorySecretaryRepository } from "!tests/app/modules/user/doubles/in-memory-secretary-repository";
import { MediatorHandler } from "#/core/application/interfaces/mediator";
import { right } from "#/core/types/either";
import { CreateSecretaryCommand } from "#/modules/user/application/cqrs/commands/create-secretary/create-secretary.command";
import { CreateSecretaryCommandHandler, CreateSecretaryCommandResult } from "#/modules/user/application/cqrs/commands/create-secretary/create-secretary.command-handler";

export type CreateSecretaryCommandHandlerStubResponse = CreateSecretaryCommandResult;

export class CreateSecretaryCommandHandlerStub extends CreateSecretaryCommandHandler implements MediatorHandler
{
  public constructor() {
    super(new InMemorySecretaryRepository());
  }

  async handle(_props: CreateSecretaryCommand): Promise<CreateSecretaryCommandHandlerStubResponse> {
    return right(undefined);
  }
}
