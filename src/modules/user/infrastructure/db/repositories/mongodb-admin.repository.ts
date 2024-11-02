import { Mapper } from "#/core/domain/entities/mapper";
import { MongoRepository } from "#/core/infrastructure/db/mongodb/mongodb-repository.base";
import { Admin } from "#/modules/user/domain/entities/admin";
import { AdminRepository } from "#/modules/user/domain/repositories/admin.repository";
import { AdminModel } from "#/modules/user/infrastructure/db/models/admin.model";
import { MongoDBAdminModel } from "#/modules/user/infrastructure/db/models/mongodb/mongodb-admin.model";
import { AdminMapperSymbol } from "#/modules/user/infrastructure/di/user.di-token";
import { Inject, Injectable } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connection, Model } from "mongoose";

@Injectable()
export class MongoDBAdminRepository
  extends MongoRepository<Admin, MongoDBAdminModel>
  implements AdminRepository
{
  constructor(
    @Inject(AdminMapperSymbol)
    protected readonly mapper: Mapper<Admin, AdminModel>,
    @InjectModel(MongoDBAdminModel.name)
    protected readonly adminModel: Model<MongoDBAdminModel>,
    @InjectConnection() connection: Connection,
  ) {
    super(mapper, adminModel, connection);
  }

  public async findByDocument(document: string): Promise<Admin | null> {
    const admin = await this.adminModel.findOne({ document });
    if (!admin) return null;
    return this.mapper.toDomain(admin);
  }
}
