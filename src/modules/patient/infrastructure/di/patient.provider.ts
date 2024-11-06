import * as PatientSymbols from "#/modules/patient/infrastructure/di/patient.di-token";
import { Provider } from "@nestjs/common";
import { MongoDBPatientRepository } from "#/modules/patient/infrastructure/db/repositories/mongodb-patient.repository";
import { PatientMapper } from "#/modules/patient/infrastructure/db/mappers/patient.mapper";

export const PatientRepositoryProvider: Provider = {
  provide: PatientSymbols.PatientRepositorySymbol,
  useClass: MongoDBPatientRepository
};

export const PatientMapperProvider: Provider = {
  provide: PatientSymbols.PatientMapperSymbol,
  useClass: PatientMapper
};

export const patientProviders: Provider[] = [
  PatientRepositoryProvider,
  PatientMapperProvider
];
