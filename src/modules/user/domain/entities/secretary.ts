import { Entity } from "#/core/domain/entities/entity";
import { Ulid } from "#/core/domain/value-objects/ulid";
import { SecretaryId } from "#/modules/user/domain/value-objects/secretary-id";
import { UserId } from "#/modules/user/domain/value-objects/user-id";

interface ConstructorProperties {
  id: SecretaryId;
  props: SecretaryProps;
}

export interface CreateSecretaryProps {
  userId: UserId;
  document: string
}

export interface SecretaryProps {
  userId: UserId;
  document: string;
  createdAt: Date;
  updatedAt?: Date;
}

export type RestoreSecretaryProps = ConstructorProperties;

export class Secretary extends Entity<SecretaryProps> {
  private constructor({ id, props }: ConstructorProperties) {
    super({ id, props });
  }

  public static create(props: CreateSecretaryProps): Secretary {
    const createSecretaryProps: ConstructorProperties = {
      id: SecretaryId.create(Ulid.new()),
      props: {
        ...props,
        createdAt: new Date()
      }
    };

    return new Secretary(createSecretaryProps);
  }

  public static restore(props: RestoreSecretaryProps): Secretary {
    return new Secretary(props);
  }

  public getUserId(): UserId {
    return this.props.userId;
  }

  public getDocument(): string {
    return this.props.document;
  }
}