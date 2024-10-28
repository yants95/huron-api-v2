import { Entity } from "#/core/domain/entities/entity";
import { Ulid } from "#/core/domain/value-objects/ulid";
import { UserType } from "#/modules/user/domain/enum/user-type";
import { UserStatus } from "#/modules/user/domain/enum/user-status";
import { UserId } from "#/modules/user/domain/value-objects/user-id";

interface ConstructorProperties {
  id: UserId;
  props: UserProps;
}

export interface CreateUserProps {
  name: string;
  email: string;
  password: string;
}

export interface UserProps {
  name: string;
  email: string;
  password: string;
  type: UserType;
  status: UserStatus;
  createdAt: Date;
  firstAccessAt: Date | null;
  updatedAt?: Date;
}

export type RestoreUserProps = ConstructorProperties;

export class User extends Entity<UserProps> {
  protected entityId!: UserId;

  private constructor({ id, props }: ConstructorProperties) {
    super({ id, props });
    this.entityId = id;
  }

  public static create(props: CreateUserProps): User {
    const createUserProps: ConstructorProperties = {
      id: UserId.create(Ulid.new()),
      props: {
        ...props,
        createdAt: new Date(),

        firstAccessAt: null,
        type: UserType.admin,
        status: UserStatus.enabled
      }
    };

    return new User(createUserProps);
  }

  public static restore(props: RestoreUserProps): User {
    return new User(props);
  }
}