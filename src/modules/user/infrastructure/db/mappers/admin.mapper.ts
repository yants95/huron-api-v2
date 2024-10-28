import { Mapper } from "#/core/domain/entities/mapper";
import { Admin } from "#/modules/user/domain/entities/admin";
import { UserId } from "#/modules/user/domain/value-objects/user-id";
import { AdminId } from "#/modules/user/domain/value-objects/admin-id";
import { AdminModel, adminSchema } from "#/modules/user/infrastructure/db/models/admin.model";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AdminMapper implements Mapper<Admin, AdminModel> {
  public toPersist(entity: Admin): AdminModel {
    const admin = entity.getPropsCopy();
    const data: AdminModel = {
      id: admin.id.toString(),
      userId: admin.userId.toString(),
      document: admin.document,
      createdAt: admin.createdAt
    };
    adminSchema.parse(data);
    return data;
  }

  public toDomain(record: AdminModel): Admin {
    return Admin.restore({
      id: AdminId.create(record.id),
      props: {
        userId: UserId.create(record.userId),
        document: record.document,
        createdAt: record.createdAt
      },
    });
  }
}
