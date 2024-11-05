import { convertPropsToObject } from "#/core/domain/value-objects/utils/convert-props-to-object";
import { Guard } from "#/core/domain/value-objects/utils/guard";

type ValueObjectProps<T> = T extends Primitives | Date ? DomainPrimitive<T> : T;

export type Primitives = string | number | boolean;
export interface DomainPrimitive<T extends Primitives | Date> {
  value: T;
}

/**
 * Represents a Value Object in the domain model.
 * Value Objects are immutable and are used to describe attributes of an entity.
 * They ensure data integrity and are an essential part of domain-driven design.
 *
 * @typeparam T - The type of value encapsulated by this Value Object.
 */
export abstract class ValueObject<T> {
  /**
   * The properties of the Value Object.
   */
  protected readonly props: ValueObjectProps<T>;

  /**
   * Creates a new instance of the Value Object.
   *
   * @param props - The properties of the Value Object.
   * @throws Error if the properties are empty or null.
   */
  public constructor(props: ValueObjectProps<T>) {
    this.checkIfEmpty(props);
    this.validate(props);
    this.props = props;
  }

  /**
   * Checks if an object is an instance of Value Object.
   *
   * @param obj - The object to check.
   * @returns true if the object is a Value Object; otherwise, false.
   */
  public static isValueObject(obj: unknown): obj is ValueObject<unknown> {
    return obj instanceof ValueObject;
  }

  /**
   * Compares this Value Object to another Value Object for equality.
   *
   * @param vo - The Value Object to compare.
   * @returns true if the Value Objects are equal; otherwise, false.
   */
  public equals(vo?: ValueObject<T>): boolean {
    if (Guard.isEmpty(vo)) {
      return false;
    }

    return JSON.stringify(this) === JSON.stringify(vo);
  }

  /**
   * Unpacks and returns the properties of the Value Object as a readonly object.
   *
   * @returns A readonly object containing the properties of the Value Object.
   */
  public unpack(): Readonly<ValueObjectProps<T>> {
    const propsCopy = convertPropsToObject(this.props);

    return Object.freeze(propsCopy);
  }

  /**
   * Checks if the properties of the Value Object are empty and throws an error if so.
   *
   * @param props - The properties to check.
   * @throws Error if the properties are empty.
   */
  private checkIfEmpty(props: ValueObjectProps<T>): void {
    if (Guard.isEmpty(props)) {
      throw new Error("Value Object Property cannot be empty");
    }
  }

  /**
   * An abstract method to be implemented by subclasses for property validation.
   *
   * @param props - The properties to validate.
   */
  protected abstract validate(props: ValueObjectProps<T>): void;
}
