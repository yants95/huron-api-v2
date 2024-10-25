import { Entity } from "#/core/domain/entities/entity";
import { ValueObject } from "#/core/domain/value-objects/primitives/value-object";

function isEntity(obj: unknown): obj is Entity<unknown> {
  return (
    Object.prototype.hasOwnProperty.call(obj, "toObject") &&
    Object.prototype.hasOwnProperty.call(obj, "id") &&
    ValueObject.isValueObject((obj as Entity<unknown>).id)
  );
}

function convertToPlainObject<T>(item: T): unknown {
  if (ValueObject.isValueObject(item)) {
    return item.unpack();
  }

  if (isEntity(item)) {
    return item.toObject();
  }

  return item;
}

export function convertPropsToObject<T>(props: T): Readonly<T> {
  const propsCopy = { ...props };

  for (const prop in propsCopy) {
    if (Array.isArray(propsCopy)) {
      propsCopy[prop] = (propsCopy as T[]).map((item) =>
        convertToPlainObject(item)
      ) as unknown as (T & unknown[])[Extract<keyof T, string>];
    }
    propsCopy[prop] = convertToPlainObject(propsCopy[prop]) as T[Extract<
      keyof T,
      string
    >];
  }

  return propsCopy;
}
