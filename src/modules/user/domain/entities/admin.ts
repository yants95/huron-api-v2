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
  cpf: string
}

export interface AdminProps {
  userId: UserId;
  cpf: string;
}

export class Admin extends Entity<AdminProps> {
  private constructor({ id, props }: ConstructorProperties) {
    super({ id, props });
  }

  public static create(props: CreateAdminProps): Admin {
    const createAdminProps: ConstructorProperties = {
      id: AdminId.create(Ulid.new()),
      props
    };

    return new Admin(createAdminProps);
  }

  public getUserId(): UserId {
    return this.props.userId;
  }

  public getCpf(): string {
    return this.props.cpf;
  }
}