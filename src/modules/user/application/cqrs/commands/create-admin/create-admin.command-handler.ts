import { Either, right } from "#/core/types/either";
import { UserAlreadyExistsError } from "#/modules/user/application/errors/user-already-exists.error";

import { Inject, Injectable } from "@nestjs/common";
import { AdminRepositorySymbol } from "#/modules/user/infrastructure/di/user.di-token";
import { Admin } from "#/modules/user/domain/entities/admin";
import { CreateAdminCommand } from "#/modules/user/application/cqrs/commands/create-admin/create-admin.command";
import { AdminRepository } from "#/modules/user/domain/repositories/admin.repository";
import { MediatorHandler } from "#/core/application/interfaces/mediator";

type CommandErrors = UserAlreadyExistsError;
export type CreateAdminCommandResult = Either<CommandErrors, void>;

@Injectable()
export class CreateAdminCommandHandler implements MediatorHandler {
  public constructor(
    @Inject(AdminRepositorySymbol)
    private readonly adminsRepository: AdminRepository,
  ) {}

  async handle(command: CreateAdminCommand): Promise<CreateAdminCommandResult> {
    const admin = Admin.create(command.props);
    await this.adminsRepository.insert(admin);

    return right(undefined);
  }
}