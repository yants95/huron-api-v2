import { CreateAdminCommandHandler } from "#/modules/user/application/cqrs/commands/create-admin.command-handler";
import { CreateUserCommandHandler } from "#/modules/user/application/cqrs/commands/create-user.command-handler";
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
      }
    ])
  ],
  controllers: [CreateUserController],
  providers: [
    ...userProviders,
    CreateUserCommandHandler,
    CreateAdminCommandHandler
  ],
  exports: [...userProviders]
})
export class UserModule {}