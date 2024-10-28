import { ApplicationError } from "#/core/application/errors/application.error.base";
import { Either } from "#/core/types/either";

export abstract class Mediator {
  public abstract mediate(command: unknown): Promise<any>;
}

export abstract class MediatorHandler {
  public abstract handle(command: unknown): Promise<Either<ApplicationError, any>>;
}
