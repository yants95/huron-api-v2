import { Mapper } from "#/core/domain/entities/mapper";
import { User } from "#/modules/user/domain/entities/user";
import { UserId } from "#/modules/user/domain/value-objects/user-id";
import { UserModel, userSchema } from "#/modules/user/infrastructure/db/models/user.model";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserMapper implements Mapper<User, UserModel> {
  public toPersist(entity: User): UserModel {
    const user = entity.getPropsCopy();
    const data: UserModel = {
      id: user.id.toString(),
      name: user.name,
      email: user.email,
      type: user.type,
      status: user.status,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      firstAccessAt: user.firstAccessAt
    };
    userSchema.parse(data);
    return data;
  }

  public toDomain(record: UserModel): User {
    return User.restore({
      id: UserId.create(record.id),
      props: {
        name: record.name,
        email: record.email,
        type: record.type,
        status: record.status,
        password: record.password,
        createdAt: record.createdAt,
        firstAccessAt: record.firstAccessAt,
        updatedAt: record.updatedAt
      },
    });
  }
}
