import { Either, left, right } from "#/core/types/either";

import { CommandType } from "#/core/application/cqrs/command";
import { Mediator, MediatorHandler } from "#/core/application/interfaces/mediator";
import { Inject, Injectable } from "@nestjs/common";
import { CommandHandlersSymbol } from "#/modules/user/infrastructure/di/user.di-token";
import { HandlerNotFoundError } from "#/modules/user/application/errors/handler-not-found.error";
import { CreateUserMediatorCommand } from "#/modules/user/application/cqrs/commands/create-user-mediator.command";

type MediatorErrors = HandlerNotFoundError;
export type CreateUserMediatorResult = Either<MediatorErrors, void>;

@Injectable()
export class CreateUserMediator implements Mediator {
  public constructor(
    @Inject(CommandHandlersSymbol)
    private readonly handlers: Map<CommandType, MediatorHandler>
  ) {}

  async mediate(command: CreateUserMediatorCommand): Promise<CreateUserMediatorResult> {
    const handler = this.handlers.get(command.type);
    if (!handler) return left(HandlerNotFoundError.create());
    const response = await handler.handle(command);
    if (response.isLeft()) return left(response.value);

    return right(undefined);
  }
}
