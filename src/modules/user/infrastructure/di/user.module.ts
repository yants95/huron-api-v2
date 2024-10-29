import { CreateAdminCommandHandler } from "#/modules/user/application/cqrs/commands/create-admin/create-admin.command-handler";
import { CreateDoctorCommandHandler } from "#/modules/user/application/cqrs/commands/create-doctor/create-doctor.command-handler";
import { CreateUserCommandHandler } from "#/modules/user/application/cqrs/commands/create-user/create-user.command-handler";
import { MongoDBAdminModel, MongoDBAdminModelSchema } from "#/modules/user/infrastructure/db/models/mongodb/mongodb-admin.model";
import { MongoDBDoctorModel, MongoDBDoctorModelSchema } from "#/modules/user/infrastructure/db/models/mongodb/mongodb-doctor.model";
import { MongoDBUserModel, MongoDBUserModelSchema } from "#/modules/user/infrastructure/db/models/mongodb/mongodb-user.model";
import { userProviders } from "#/modules/user/infrastructure/di/user.provider";
import { CreateUserController } from "#/modules/user/infrastructure/http/controllers/create-user.controller";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: MongoDBUserModel.name,
        schema: MongoDBUserModelSchema
      },
      {
        name: MongoDBAdminModel.name,
        schema: MongoDBAdminModelSchema
      },
      {
        name: MongoDBDoctorModel.name,
        schema: MongoDBDoctorModelSchema
      }
    ])
  ],
  controllers: [CreateUserController],
  providers: [
    ...userProviders,
    CreateUserCommandHandler,
    CreateAdminCommandHandler,
    CreateDoctorCommandHandler
  ],
  exports: [...userProviders]
})
export class UserModule {}