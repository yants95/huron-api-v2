import { EntityId } from "#/core/domain/entities/entity-id";
import { convertPropsToObject } from "#/core/domain/value-objects/utils/convert-props-to-object";

interface BaseEntityProps {
  id: EntityId;
}

interface CreateEntityProps<T> {
  id: EntityId;
  props: T;
}

export abstract class Entity<EntityProps> {
  protected readonly props!: EntityProps;

  readonly id: EntityId;

  protected constructor({ id, props }: CreateEntityProps<EntityProps>) {
    this.props = props;
    this.id = id;
  }

  public static isEntity(model: unknown): model is Entity<unknown> {
    return model instanceof Entity;
  }

  public getPropsCopy(): BaseEntityProps & EntityProps {
    const propsCopy = {
      id: this.id,
      ...this.props,
    };

    return Object.freeze(propsCopy);
  }

  public toObject(): Readonly<{ id: EntityId; } & EntityProps> {
    const plainProps = convertPropsToObject(this.props);

    const result = {
      id: this.id,
      ...plainProps,
    };

    return Object.freeze(result);
  }
}
