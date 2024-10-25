/**
 * Abstract class representing an ID of an entity.
 *
 * @typeparam T - The type of ID.
 */
export abstract class Id<T> {
  /**
   * Checks if this ID is equal to another ID.
   *
   * @param id - The other ID to compare.
   * @returns true if the IDs are equal; otherwise, false.
   */
  public abstract equals(id: T): boolean;

  /**
   * Returns a string representation of the ID.
   *
   * @returns The string representation of the ID.
   */
  public abstract toString(): string;
}
