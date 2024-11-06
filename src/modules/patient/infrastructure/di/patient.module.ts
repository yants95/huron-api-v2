import { CreatePatientCommandHandler } from "#/modules/patient/application/cqrs/commands/create-patient/create-patient.command-handler";
import { MongoDBPatientModel, MongoDBPatientModelSchema } from "#/modules/patient/infrastructure/db/models/mongodb/mongodb-patient.model";
import { patientProviders } from "#/modules/patient/infrastructure/di/patient.provider";
import { CreatePatientController } from "#/modules/patient/infrastructure/http/controllers/create-patient.controller";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: MongoDBPatientModel.name,
        schema: MongoDBPatientModelSchema
      },
    ])
  ],
  controllers: [CreatePatientController],
  providers: [
    ...patientProviders,
    CreatePatientCommandHandler,
  ],
  exports: [...patientProviders]
})
export class PatientModule {}