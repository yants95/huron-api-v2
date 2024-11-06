import { Mapper } from "#/core/domain/entities/mapper";
import { MongoRepository } from "#/core/infrastructure/db/mongodb/mongodb-repository.base";
import { Patient } from "#/modules/patient/domain/entities/patient";
import { PatientRepository } from "#/modules/patient/domain/repositories/patient.repository";
import { MongoDBPatientModel } from "#/modules/patient/infrastructure/db/models/mongodb/mongodb-patient.model";
import { PatientModel } from "#/modules/patient/infrastructure/db/models/patient.model";
import { PatientMapperSymbol } from "#/modules/patient/infrastructure/di/patient.di-token";
import { Inject, Injectable } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connection, Model } from "mongoose";

@Injectable()
export class MongoDBPatientRepository extends MongoRepository<Patient, MongoDBPatientModel> implements PatientRepository {
  constructor(
    @Inject(PatientMapperSymbol)
    protected readonly mapper: Mapper<Patient, PatientModel>,
    @InjectModel(MongoDBPatientModel.name)
    protected readonly patientModel: Model<MongoDBPatientModel>,
    @InjectConnection() connection: Connection,
  ) {
    super(mapper, patientModel, connection);
  }

  public async findByDocument(document: string): Promise<Patient | null> {
    const patient = await this.patientModel.findOne({ document });
    if (!patient) return null;
    return this.mapper.toDomain(patient);
  }
}
