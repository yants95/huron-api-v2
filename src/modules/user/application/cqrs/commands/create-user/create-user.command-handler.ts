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
import { CreateDoctorCommand } from "#/modules/user/application/cqrs/commands/create-doctor/create-doctor.command";
import { CreateSecretaryCommand } from "#/modules/user/application/cqrs/commands/create-secretary/create-secretary.command";
import { UserType } from "#/modules/user/domain/enum/user-type";

type CommandErrors = UserAlreadyExistsError;
type CommandResult = Either<CommandErrors, void>;

@Injectable()
@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler implements ICommandHandler<CreateUserCommand> {

  public constructor(
    @Inject(UserRepositorySymbol)
    private readonly usersRepository: UserRepository,
    @Inject(CreateUserMediatorSymbol)
    private readonly mediator: Mediator,
  ) {}

  async execute(command: CreateUserCommand): Promise<CommandResult> {
    const userExists = await this.usersRepository.findByEmail(command.email);
    if (userExists) return left(UserAlreadyExistsError.create());
    const {
      admin: adminCommand,
      secretary: secretaryCommand,
      doctor: doctorCommand
    } = command;
    
    const user = User.create(command);
    
    if (adminCommand) {
      const admin = new CreateAdminCommand({
        userId: user.id.toString(),
        ...adminCommand
      });
      user.setUserType(UserType.admin);
      const adminResponse = await this.mediator.mediate(admin);
      if (adminResponse.isLeft()) return left(adminResponse.value);
    }

    if (doctorCommand) {
      const doctor = new CreateDoctorCommand({
        userId: user.id.toString(),
        ...doctorCommand
      });
      user.setUserType(UserType.doctor);
      const doctorResponse = await this.mediator.mediate(doctor);
      if (doctorResponse.isLeft()) return left(doctorResponse.value);
    }

    if (secretaryCommand) {
      const secretary = new CreateSecretaryCommand({
        userId: user.id.toString(),
        ...secretaryCommand
      });
      user.setUserType(UserType.secretary);
      const secretaryResponse = await this.mediator.mediate(secretary);
      if (secretaryResponse.isLeft()) return left(secretaryResponse.value);
    }

    await this.usersRepository.insert(user);

    return right(undefined);
  }
}