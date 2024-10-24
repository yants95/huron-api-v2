interface BaseEntityProps {
  id: string;
}

interface CreateEntityProps<T> {
  id: string;
  props: T;
}

export abstract class Entity<EntityProps> {
  protected readonly props!: EntityProps;

  readonly id: string;

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
}
