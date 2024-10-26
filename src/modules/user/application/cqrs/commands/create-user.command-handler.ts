import { Either, left, right } from "#/core/types/either";
import { CreateUserCommand } from "#/modules/user/application/cqrs/commands/create-user.command";
import { UserAlreadyExistsError } from "#/modules/user/application/errors/user-already-exists.error";
import { User } from "#/modules/user/domain/entities/user";
import { UserType } from "#/modules/user/domain/enum/user-type";
import { UserStatus } from "#/modules/user/domain/enum/user-status";
import { UserRepository } from "#/modules/user/domain/repositories/user.repository";

import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Inject, Injectable } from "@nestjs/common";
import { UserRepositorySymbol } from "#/modules/user/infrastructure/di/user.di-token";

type CommandErrors = UserAlreadyExistsError;
type CommandResult = Either<CommandErrors, void>;

@Injectable()
@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler implements ICommandHandler<CreateUserCommand> {
  public constructor(
    @Inject(UserRepositorySymbol)
    private readonly usersRepository: UserRepository,
  ) {}

  async execute(command: CreateUserCommand): Promise<CommandResult> {
    const foundUser = await this.usersRepository.findByEmail(command.email);
    if (foundUser) return left(UserAlreadyExistsError.create());
    const user = User.create({
      ...command,
      type: UserType.admin,
      status: UserStatus.enabled
    });
    await this.usersRepository.insert(user);

    return right(undefined);
  }
}