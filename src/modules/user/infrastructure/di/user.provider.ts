import { InMemoryUserRepository } from "!tests/app/modules/user/doubles/in-memory-user-repository";
import { CommandType } from "#/core/application/cqrs/command";
import { CreateAdminCommandHandler } from "#/modules/user/application/cqrs/commands/create-admin.command-handler";
import { CreateUserMediator } from "#/modules/user/application/cqrs/commands/create-user.mediator";
import { UserMapper } from "#/modules/user/infrastructure/db/mappers/user.mapper";
import { MongoDBUserRepository } from "#/modules/user/infrastructure/db/repositories/mongodb-user.repository";
import * as UserSymbols from "#/modules/user/infrastructure/di/user.di-token";
import { Provider } from "@nestjs/common";

export const UserRepositoryProvider: Provider = {
  provide: UserSymbols.UserRepositorySymbol,
  useClass: MongoDBUserRepository
};

export const UserMapperProvider: Provider = {
  provide: UserSymbols.UserMapperSymbol,
  useClass: UserMapper
};

export const UserMediatorProvider: Provider = {
  provide: UserSymbols.CreateUserMediatorSymbol,
  useClass: CreateUserMediator,
};

export const AdminRepositoryProvider: Provider = {
  provide: UserSymbols.AdminRepositorySymbol,
  useClass: InMemoryUserRepository
};

type UserHandlers = CreateAdminCommandHandler;

export const UseCasesHandlersProvider: Provider = {
  provide: UserSymbols.CommandHandlersSymbol,
  useFactory: (
    adminHandler: CreateAdminCommandHandler,
  ) =>
    new Map<CommandType, UserHandlers>([
      [CommandType.admin, adminHandler],
    ]),
  inject: [CreateAdminCommandHandler]
};

export const userProviders: Provider[] = [
  UserRepositoryProvider,
  UserMediatorProvider,
  UseCasesHandlersProvider,
  UserMapperProvider,
  AdminRepositoryProvider
]