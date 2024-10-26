import { Either, right } from "#/core/types/either";
import { UserAlreadyExistsError } from "#/modules/user/application/errors/user-already-exists.error";


import { ICommandHandler } from "@nestjs/cqrs";
import { Inject, Injectable } from "@nestjs/common";
import { AdminRepositorySymbol } from "#/modules/user/infrastructure/di/user.di-token";
import { Admin } from "#/modules/user/domain/entities/admin";
import { CreateAdminCommand } from "#/modules/user/application/cqrs/commands/create-admin.command";
import { AdminRepository } from "#/modules/user/domain/repositories/admin.repository";

type CommandErrors = UserAlreadyExistsError;
type CommandResult = Either<CommandErrors, void>;

@Injectable()
export class CreateAdminCommandHandler implements ICommandHandler<CreateAdminCommand> {
  public constructor(
    @Inject(AdminRepositorySymbol)
    private readonly adminsRepository: AdminRepository,
  ) {}

  async execute(command: CreateAdminCommand): Promise<CommandResult> {
    const admin = Admin.create(command);
    await this.adminsRepository.insert(admin);

    return right(undefined);
  }
}