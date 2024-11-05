import { Entity } from "#/core/domain/entities/entity";
import { Ulid } from "#/core/domain/value-objects/ulid";
import { AdminId } from "#/modules/user/domain/value-objects/admin-id";
import { UserId } from "#/modules/user/domain/value-objects/user-id";

interface ConstructorProperties {
  id: AdminId;
  props: AdminProps;
}

export interface CreateAdminProps {
  userId: UserId;
  document: string
}

export interface AdminProps {
  userId: UserId;
  document: string;
  createdAt: Date;
  updatedAt?: Date;
}

export type RestoreAdminProps = ConstructorProperties;

export class Admin extends Entity<AdminProps> {
  private constructor({ id, props }: ConstructorProperties) {
    super({ id, props });
  }

  public static create(props: CreateAdminProps): Admin {
    const createAdminProps: ConstructorProperties = {
      id: AdminId.create(Ulid.new()),
      props: {
        ...props,
        createdAt: new Date()
      }
    };

    return new Admin(createAdminProps);
  }

  public static restore(props: RestoreAdminProps): Admin {
    return new Admin(props);
  }

  public getUserId(): UserId {
    return this.props.userId;
  }

  public getDocument(): string {
    return this.props.document;
  }
}