import { Either, left, right } from "#/core/types/either";

import { Inject, Injectable } from "@nestjs/common";
import { SecretaryRepositorySymbol } from "#/modules/user/infrastructure/di/user.di-token";
import { Secretary } from "#/modules/user/domain/entities/secretary";
import { CreateSecretaryCommand } from "#/modules/user/application/cqrs/commands/create-secretary/create-secretary.command";
import { SecretaryRepository } from "#/modules/user/domain/repositories/secretary.repository";
import { MediatorHandler } from "#/core/application/interfaces/mediator";
import { SecretaryAlreadyExistsError } from "#/modules/user/application/errors/secretary-already-exists.error";

export type CreateSecretaryCommandResult = Either<SecretaryAlreadyExistsError, void>;

@Injectable()
export class CreateSecretaryCommandHandler implements MediatorHandler {
  public constructor(
    @Inject(SecretaryRepositorySymbol)
    private readonly secretariesRepository: SecretaryRepository,
  ) {}

  async handle(command: CreateSecretaryCommand): Promise<CreateSecretaryCommandResult> {
    const foundSecretary = await this.secretariesRepository.findByDocument(command.props.document);
    if (foundSecretary) return left(SecretaryAlreadyExistsError.create());
    const secretary = Secretary.create(command.props);
    await this.secretariesRepository.insert(secretary);

    return right(undefined);
  }
}