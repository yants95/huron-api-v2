import { Command } from "#/core/application/cqrs/command";

export abstract class Mediator {
  public abstract send(command: Command): Promise<any>;
}
