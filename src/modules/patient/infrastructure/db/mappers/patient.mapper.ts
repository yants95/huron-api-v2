import { Mapper } from "#/core/domain/entities/mapper";
import { Patient } from "#/modules/patient/domain/entities/patient";
import { PatientId } from "#/modules/patient/domain/value-objects/patient-id";
import { PatientModel } from "#/modules/patient/infrastructure/db/models/patient.model";
import { patientSchema } from "#/modules/patient/infrastructure/db/models/patient.model";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PatientMapper implements Mapper<Patient, PatientModel> {
  public toPersist(entity: Patient): PatientModel {
    const user = entity.getPropsCopy();
    const data: PatientModel = {
      id: user.id.toString(),
      name: user.name,
      email: user.email,
      age: user.age,
      height: user.height,
      weight: user.weight,
      document: user.document,
      gender: user.gender,
      phone: user.phone,
      cep: user.cep,
      address: user.address,
      birthDate: user.birthDate,
      responsibleName: user.responsibleName,
      responsibleDocument: user.responsibleDocument,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
    patientSchema.parse(data);
    return data;
  }

  public toDomain(record: PatientModel): Patient {
    return Patient.restore({
      id: PatientId.create(record.id),
      props: {
        name: record.name,
        email: record.email,
        age: record.age,
        height: record.height,
        weight: record.weight,
        document: record.document,
        gender: record.gender,
        phone: record.phone,
        cep: record.cep,
        address: record.address,
        birthDate: record.birthDate,
        responsibleName: record.responsibleName,
        responsibleDocument: record.responsibleDocument,
        createdAt: record.createdAt,
        updatedAt: record.updatedAt,
      },
    });
  }
}
