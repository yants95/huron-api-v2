import { DomainException } from "#/core/domain/domain-exception";
import { Id } from "#/core/domain/entities/id";


/**
 * Class representing an ID of an entity.
 */
export class EntityId implements Id<EntityId> {
  /**
   * Creates a new instance of EntityId.
   *
   * @param identifier - The identifier for the entity.
   */
  public constructor(private readonly identifier: string | number) {
    this.validate();
  }

  /**
   * Checks if this ID is equal to another ID.
   *
   * @param id - The other ID to compare.
   * @returns true if the IDs are equal; otherwise, false.
   */
  public equals(id: EntityId): boolean {
    return this.identifier === id.toString();
  }

  /**
   * Returns a string representation of the ID.
   *
   * @returns The string representation of the ID.
   */
  public toString(): string {
    return this.identifier.toString();
  }

  /**
   * Validates if the identifier is not empty.
   */
  protected validate(): void {
    if (this.identifierIsEmpty()) {
      throw new DomainException("Aggregate Id should not be empty");
    }
  }

  /**
   * Checks if the identifier is empty.
   *
   * @returns true if the identifier is empty; otherwise, false.
   */
  private identifierIsEmpty(): boolean {
    if (typeof this.identifier === "string") {
      return this.identifier.trim().length <= 0;
    }

    return this.identifier <= 0;
  }
}
