import { Mapper } from "#/core/domain/entities/mapper";
import { MongoRepository } from "#/core/infrastructure/db/mongodb/mongodb-repository.base";
import { Doctor } from "#/modules/user/domain/entities/doctor";
import { DoctorRepository } from "#/modules/user/domain/repositories/doctor.repository";
import { DoctorModel } from "#/modules/user/infrastructure/db/models/doctor.model";
import { MongoDBDoctorModel } from "#/modules/user/infrastructure/db/models/mongodb/mongodb-doctor.model";
import { DoctorMapperSymbol } from "#/modules/user/infrastructure/di/user.di-token";
import { Inject, Injectable } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connection, Model } from "mongoose";

@Injectable()
export class MongoDBDoctorRepository
  extends MongoRepository<Doctor, MongoDBDoctorModel>
  implements DoctorRepository
{
  constructor(
    @Inject(DoctorMapperSymbol)
    protected readonly mapper: Mapper<Doctor, DoctorModel>,
    @InjectModel(MongoDBDoctorModel.name)
    protected readonly doctorModel: Model<MongoDBDoctorModel>,
    @InjectConnection() connection: Connection,
  ) {
    super(mapper, doctorModel, connection);
  }
}
