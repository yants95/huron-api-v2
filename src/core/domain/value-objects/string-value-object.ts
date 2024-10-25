import { DomainException } from "#/core/domain/domain-exception";
import { DomainPrimitive, ValueObject } from "#/core/domain/value-objects/primitives/value-object";

export abstract class StringValueObject extends ValueObject<string> {
  protected readonly value: string;

  public constructor(value: string) {
    super({ value });
    this.value = value;
  }

  public toString(): string {
    return this.value;
  }

  public has(value: string): boolean {
    return !this.value.indexOf(value);
  }

  public extract(start: string, end: string): string {
    const indexStartValue = this.value.indexOf(start);
    const indexEndValue = this.value.lastIndexOf(end) + 1;

    return this.value.substring(indexStartValue, indexEndValue);
  }

  public remove(substrings: string[]): string {
    const regex = new RegExp("[" + substrings.join("") + "]", "g");
    return this.value.replace(regex, "");
  }

  protected validate(props: DomainPrimitive<string>): void {
    if (props.value.trim().length <= 0) {
      throw new DomainException(`${this.constructor.name} should not be empty.`);
    }
  }
}
