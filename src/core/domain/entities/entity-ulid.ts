import { EntityId } from "#/core/domain/entities/entity-id";
import { Ulid } from "#/core/domain/value-objects/ulid";

export class EntityUlid extends EntityId {
  public constructor(protected readonly ulidValue: Ulid) {
    super(EntityUlid.unpackUuid(ulidValue));
  }

  public static create(value: Ulid | string): EntityUlid {
    return new EntityUlid(value instanceof Ulid ? value : Ulid.create(value));
  }

  private static unpackUuid(ulid: Ulid): string {
    return ulid.toString();
  }

  public toUuid(): Ulid {
    return this.ulidValue;
  }
}
