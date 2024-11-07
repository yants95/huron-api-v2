import { Guard } from "#/core/domain/value-objects/utils/guard";

export type CommandProps<T> = Omit<T, 'id' | 'getName' | 'type'> & Partial<Command>;

export abstract class Command {
  public constructor(props: CommandProps<unknown>) {
    if (Guard.isEmpty(props)) {
      throw new Error("Command props should not be empty");
    }
  }
};

