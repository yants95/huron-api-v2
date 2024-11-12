import { Either, left, right } from "#/core/types/either";

import { Inject, Injectable } from "@nestjs/common";
import { AdminRepositorySymbol } from "#/modules/user/infrastructure/di/user.di-token";
import { Admin } from "#/modules/user/domain/entities/admin";
import { CreateAdminCommand } from "#/modules/user/application/cqrs/commands/create-admin/create-admin.command";
import { AdminRepository } from "#/modules/user/domain/repositories/admin.repository";
import { MediatorHandler } from "#/core/application/interfaces/mediator";
import { AdminAlreadyExistsError } from "#/modules/user/application/errors/admin-already-exists.error";
import { UserId } from "#/modules/user/domain/value-objects/user-id";

export type CreateAdminCommandResult = Either<AdminAlreadyExistsError, void>;

@Injectable()
export class CreateAdminCommandHandler implements MediatorHandler {
  public constructor(
    @Inject(AdminRepositorySymbol)
    private readonly adminsRepository: AdminRepository,
  ) {}

  async handle(command: CreateAdminCommand): Promise<CreateAdminCommandResult> {
    const foundAdmin = await this.adminsRepository.findOne(command.document);
    if (foundAdmin) return left(AdminAlreadyExistsError.create());
    const admin = Admin.create({
      ...command,
      userId: UserId.create(command.userId),
    });
    await this.adminsRepository.insert(admin);

    return right(undefined);
  }
}