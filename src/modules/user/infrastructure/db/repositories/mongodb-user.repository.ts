import { Mapper } from "#/core/domain/entities/mapper";
import { MongoRepository } from "#/core/infrastructure/db/mongodb/mongodb-repository.base";
import { User } from "#/modules/user/domain/entities/user";
import { UserRepository } from "#/modules/user/domain/repositories/user.repository";
import { MongoDBUserModel } from "#/modules/user/infrastructure/db/models/mongodb/mongodb-user.model";
import { UserMapperSymbol } from "#/modules/user/infrastructure/di/user.di-token";
import { Inject, Injectable } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connection, Model } from "mongoose";

@Injectable()
export class MongoDBUserRepository
  extends MongoRepository<User, MongoDBUserModel>
  implements UserRepository
{
  constructor(
    @Inject(UserMapperSymbol)
    protected readonly mapper: Mapper<User, MongoDBUserModel>,
    @InjectModel(MongoDBUserModel.name)
    private readonly userModel: Model<MongoDBUserModel>,
    @InjectConnection() connection: Connection,
  ) {
    super(mapper, userModel, connection);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.userModel.findOne({ email });
    if (!user) return null;
    return this.mapper.toDomain(user);
  }
}
