import { Mapper } from "#/core/domain/entities/mapper";
import { UserId } from "#/modules/user/domain/value-objects/user-id";
import { adminSchema } from "#/modules/user/infrastructure/db/models/admin.model";
import { Injectable } from "@nestjs/common";
import { Doctor } from "#/modules/user/domain/entities/doctor";
import { DoctorModel } from "#/modules/user/infrastructure/db/models/doctor.model";
import { DoctorId } from "#/modules/user/domain/value-objects/doctor-id";

@Injectable()
export class DoctorMapper implements Mapper<Doctor, DoctorModel> {
  public toPersist(entity: Doctor): DoctorModel {
    const doctor = entity.getPropsCopy();
    const data: DoctorModel = {
      id: doctor.id.toString(),
      userId: doctor.userId.toString(),
      document: doctor.document,
      createdAt: doctor.createdAt,
      crm: doctor.crm,
      specialty: doctor.specialty
    };
    adminSchema.parse(data);
    return data;
  }

  public toDomain(record: DoctorModel): Doctor {
    return Doctor.restore({
      id: DoctorId.create(record.id),
      props: {
        userId: UserId.create(record.userId),
        document: record.document,
        createdAt: record.createdAt,
        crm: record.crm,
        specialty: record.specialty
      },
    });
  }
}
