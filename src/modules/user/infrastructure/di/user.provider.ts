import { InMemoryUserRepository } from "!tests/app/modules/user/doubles/in-memory-user-repository";
import { CommandType } from "#/core/application/cqrs/command";
import { CreateAdminCommandHandler } from "#/modules/user/application/cqrs/commands/create-admin/create-admin.command-handler";
import { CreateDoctorCommandHandler } from "#/modules/user/application/cqrs/commands/create-doctor/create-doctor.command-handler";
import { CreateUserMediator } from "#/modules/user/application/cqrs/commands/create-user.mediator";
import { CreateUserCommandHandler } from "#/modules/user/application/cqrs/commands/create-user/create-user.command-handler";
import { AdminMapper } from "#/modules/user/infrastructure/db/mappers/admin.mapper";
import { DoctorMapper } from "#/modules/user/infrastructure/db/mappers/doctor.mapper";
import { UserMapper } from "#/modules/user/infrastructure/db/mappers/user.mapper";
import { MongoDBAdminRepository } from "#/modules/user/infrastructure/db/repositories/mongodb-admin.repository";
import { MongoDBDoctorRepository } from "#/modules/user/infrastructure/db/repositories/mongodb-doctor.repository";
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
  useClass: MongoDBAdminRepository
};

export const AdminMapperProvider: Provider = {
  provide: UserSymbols.AdminMapperSymbol,
  useClass: AdminMapper
};

export const DoctorRepositoryProvider: Provider = {
  provide: UserSymbols.DoctorRepositorySymbol,
  useClass: MongoDBDoctorRepository
};

export const DoctorMapperProvider: Provider = {
  provide: UserSymbols.DoctorMapperSymbol,
  useClass: DoctorMapper
};

type UserHandlers = CreateAdminCommandHandler | CreateDoctorCommandHandler;

export const CommandHandlersProvider: Provider = {
  provide: UserSymbols.CommandHandlersSymbol,
  useFactory: (
    adminHandler: CreateAdminCommandHandler,
    doctorHandler: CreateDoctorCommandHandler
  ) =>
    new Map<CommandType, UserHandlers>([
      [CommandType.admin, adminHandler],
      [CommandType.doctor, doctorHandler],
    ]),
  inject: [CreateAdminCommandHandler, CreateDoctorCommandHandler]
};

export const userProviders: Provider[] = [
  UserRepositoryProvider,
  UserMediatorProvider,
  CommandHandlersProvider,
  UserMapperProvider,
  AdminRepositoryProvider,
  AdminMapperProvider,
  DoctorRepositoryProvider,
  DoctorMapperProvider
]