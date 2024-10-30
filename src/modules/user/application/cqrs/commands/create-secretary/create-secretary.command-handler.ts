import { Either, right } from "#/core/types/either";
import { UserAlreadyExistsError } from "#/modules/user/application/errors/user-already-exists.error";

import { Inject, Injectable } from "@nestjs/common";
import { SecretaryRepositorySymbol } from "#/modules/user/infrastructure/di/user.di-token";
import { Secretary } from "#/modules/user/domain/entities/secretary";
import { CreateSecretaryCommand } from "#/modules/user/application/cqrs/commands/create-secretary/create-secretary.command";
import { SecretaryRepository } from "#/modules/user/domain/repositories/secretary.repository";
import { MediatorHandler } from "#/core/application/interfaces/mediator";

type CommandErrors = UserAlreadyExistsError;
export type CreateSecretaryCommandResult = Either<CommandErrors, void>;

@Injectable()
export class CreateSecretaryCommandHandler implements MediatorHandler {
  public constructor(
    @Inject(SecretaryRepositorySymbol)
    private readonly secretariesRepository: SecretaryRepository,
  ) {}

  async handle(command: CreateSecretaryCommand): Promise<CreateSecretaryCommandResult> {
    const secretary = Secretary.create(command.props);
    await this.secretariesRepository.insert(secretary);

    return right(undefined);
  }
}