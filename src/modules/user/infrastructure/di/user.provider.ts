import { CreateAdminCommandHandler } from "#/modules/user/application/cqrs/commands/create-admin/create-admin.command-handler";
import { CreateDoctorCommandHandler } from "#/modules/user/application/cqrs/commands/create-doctor/create-doctor.command-handler";
import { CreateSecretaryCommandHandler } from "#/modules/user/application/cqrs/commands/create-secretary/create-secretary.command-handler";
import { CreateUserMediator } from "#/modules/user/application/cqrs/commands/create-user.mediator";
import { UserType } from "#/modules/user/domain/enum/user-type";
import { AdminMapper } from "#/modules/user/infrastructure/db/mappers/admin.mapper";
import { DoctorMapper } from "#/modules/user/infrastructure/db/mappers/doctor.mapper";
import { SecretaryMapper } from "#/modules/user/infrastructure/db/mappers/secretary.mapper";
import { UserMapper } from "#/modules/user/infrastructure/db/mappers/user.mapper";
import { MongoDBAdminRepository } from "#/modules/user/infrastructure/db/repositories/mongodb-admin.repository";
import { MongoDBDoctorRepository } from "#/modules/user/infrastructure/db/repositories/mongodb-doctor.repository";
import { MongoDBSecretaryRepository } from "#/modules/user/infrastructure/db/repositories/mongodb-secretary.repository";
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

export const SecretaryRepositoryProvider: Provider = {
  provide: UserSymbols.SecretaryRepositorySymbol,
  useClass: MongoDBSecretaryRepository
};

export const SecretaryMapperProvider: Provider = {
  provide: UserSymbols.SecretaryMapperSymbol,
  useClass: SecretaryMapper
};

type UserHandlers = CreateAdminCommandHandler | CreateDoctorCommandHandler | CreateSecretaryCommandHandler;

export const CommandHandlersProvider: Provider = {
  provide: UserSymbols.CommandHandlersSymbol,
  useFactory: (
    adminHandler: CreateAdminCommandHandler,
    doctorHandler: CreateDoctorCommandHandler,
    secretaryHandler: CreateSecretaryCommandHandler
  ) =>
    new Map<UserType, UserHandlers>([
      [UserType.admin, adminHandler],
      [UserType.doctor, doctorHandler],
      [UserType.secretary, secretaryHandler],
    ]),
  inject: [CreateAdminCommandHandler, CreateDoctorCommandHandler, CreateSecretaryCommandHandler]
};

export const userProviders: Provider[] = [
  UserRepositoryProvider,
  UserMediatorProvider,
  CommandHandlersProvider,
  UserMapperProvider,
  AdminRepositoryProvider,
  AdminMapperProvider,
  DoctorRepositoryProvider,
  DoctorMapperProvider,
  SecretaryRepositoryProvider,
  SecretaryMapperProvider
]