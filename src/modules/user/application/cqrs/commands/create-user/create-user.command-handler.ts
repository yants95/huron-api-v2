import { Either, left, right } from "#/core/types/either";
import { CreateUserCommand } from "#/modules/user/application/cqrs/commands/create-user/create-user.command";
import { UserAlreadyExistsError } from "#/modules/user/application/errors/user-already-exists.error";
import { User } from "#/modules/user/domain/entities/user";
import { UserRepository } from "#/modules/user/domain/repositories/user.repository";

import { Inject, Injectable } from "@nestjs/common";
import { CreateUserMediatorSymbol, UserRepositorySymbol } from "#/modules/user/infrastructure/di/user.di-token";
import { Mediator } from "#/core/application/interfaces/mediator";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateAdminCommand } from "#/modules/user/application/cqrs/commands/create-admin/create-admin.command";
import { UserId } from "#/modules/user/domain/value-objects/user-id";
import { CreateDoctorCommand } from "#/modules/user/application/cqrs/commands/create-doctor/create-doctor.command";
import { CreateSecretaryCommand } from "#/modules/user/application/cqrs/commands/create-secretary/create-secretary.command";

type CommandErrors = UserAlreadyExistsError;
type CommandResult = Either<CommandErrors, void>;

@Injectable()
@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler implements ICommandHandler<CreateUserCommand> {

  public constructor(
    @Inject(UserRepositorySymbol)
    private readonly usersRepository: UserRepository,
    @Inject(CreateUserMediatorSymbol)
    private readonly mediator: Mediator
  ) {}

  async execute(command: CreateUserCommand): Promise<CommandResult> {
    const userExists = await this.usersRepository.findByEmail(command.props.email);
    if (userExists) return left(UserAlreadyExistsError.create());
    const user = User.create(command.props);
    await this.usersRepository.insert(user);
    
    if (command.props?.admin) {
      const admin = new CreateAdminCommand({
        userId: UserId.create(user.id.toString()),
        ...command.props.admin
      });
      await this.mediator.mediate(admin);
    }

    if (command.props?.doctor) {
      const admin = new CreateDoctorCommand({
        userId: UserId.create(user.id.toString()),
        ...command.props.doctor
      });
      await this.mediator.mediate(admin);
    }

    if (command.props?.secretary) {
      const secretary = new CreateSecretaryCommand({
        userId: UserId.create(user.id.toString()),
        ...command.props.secretary
      });
      await this.mediator.mediate(secretary);
    }

    return right(undefined);
  }
}