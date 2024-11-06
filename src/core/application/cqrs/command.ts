import { Guard } from "#/core/domain/value-objects/utils/guard";

export type CommandProps<T> = Omit<T, 'id' | 'getName'>;

export abstract class Command {

  public abstract getName(): string;

  public constructor(props: CommandProps<unknown>) {
    if (Guard.isEmpty(props)) {
      throw new Error("Command props should not be empty");
    }
  }
};

