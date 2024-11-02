import { Mapper } from "#/core/domain/entities/mapper";
import { Secretary } from "#/modules/user/domain/entities/secretary";
import { UserId } from "#/modules/user/domain/value-objects/user-id";
import { SecretaryId } from "#/modules/user/domain/value-objects/secretary-id";
import { SecretaryModel, secretarySchema } from "#/modules/user/infrastructure/db/models/secretary.model";
import { Injectable } from "@nestjs/common";

@Injectable()
export class SecretaryMapper implements Mapper<Secretary, SecretaryModel> {
  public toPersist(entity: Secretary): SecretaryModel {
    const secretary = entity.getPropsCopy();
    const data: SecretaryModel = {
      id: secretary.id.toString(),
      userId: secretary.userId.toString(),
      document: secretary.document,
      createdAt: secretary.createdAt
    };
    secretarySchema.parse(data);
    return data;
  }

  public toDomain(record: SecretaryModel): Secretary {
    return Secretary.restore({
      id: SecretaryId.create(record.id),
      props: {
        userId: UserId.create(record.userId),
        document: record.document,
        createdAt: record.createdAt
      },
    });
  }
}
