import { Mapper } from "#/core/domain/entities/mapper";
import { MongoRepository } from "#/core/infrastructure/db/mongodb/mongodb-repository.base";
import { Secretary } from "#/modules/user/domain/entities/secretary";
import { SecretaryRepository } from "#/modules/user/domain/repositories/secretary.repository";
import { MongoDBSecretaryModel } from "#/modules/user/infrastructure/db/models/mongodb/mongodb-secretary.model";
import { SecretaryModel } from "#/modules/user/infrastructure/db/models/secretary.model";
import { SecretaryMapperSymbol } from "#/modules/user/infrastructure/di/user.di-token";
import { Inject, Injectable } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connection, Model } from "mongoose";

@Injectable()
export class MongoDBSecretaryRepository
  extends MongoRepository<Secretary, MongoDBSecretaryModel>
  implements SecretaryRepository
{
  constructor(
    @Inject(SecretaryMapperSymbol)
    protected readonly mapper: Mapper<Secretary, SecretaryModel>,
    @InjectModel(MongoDBSecretaryModel.name)
    protected readonly secretaryModel: Model<MongoDBSecretaryModel>,
    @InjectConnection() connection: Connection,
  ) {
    super(mapper, secretaryModel, connection);
  }

  public async findByDocument(document: string): Promise<Secretary | null> {
    const secretary = await this.secretaryModel.findOne({ document });
    if (!secretary) return null;
    return this.mapper.toDomain(secretary);
  }
}
