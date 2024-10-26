import { Either, left, right } from "#/core/types/either";

import { Command, CommandType } from "#/core/application/cqrs/command";
import { Mediator } from "#/core/application/interfaces/mediator";
import { ICommandHandler } from "@nestjs/cqrs";
import { Inject, Injectable } from "@nestjs/common";
import { CommandHandlersSymbol } from "#/modules/user/infrastructure/di/user.di-token";
import { HandlerNotFoundError } from "#/modules/user/application/errors/handler-not-found.error";

type MediatorErrors = HandlerNotFoundError;
type MediatorResult = Either<MediatorErrors, void>;

@Injectable()
export class CreateUserMediator implements Mediator {
  public constructor(
    @Inject(CommandHandlersSymbol)
    private readonly handlers: Map<CommandType, ICommandHandler>
  ) {}

  async send(command: Command): Promise<MediatorResult> {
    const handler = this.handlers.get(command.type);
    if (!handler) return left(HandlerNotFoundError.create());
    const response = await handler.execute(command);

    return right(undefined);
  }
}
