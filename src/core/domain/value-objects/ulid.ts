import { StringValueObject } from "#/core/domain/value-objects/string-value-object";
import { ulid } from "ulidx";

export class Ulid extends StringValueObject {
  public constructor(value: string) {
    super(value);
  }

  public static create(value: string): Ulid {
    return new Ulid(value);
  }

  static new(): Ulid {
    return new Ulid(ulid());
  }
}
