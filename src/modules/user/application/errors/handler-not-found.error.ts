import { ApplicationError } from "#/core/application/errors/application.error.base";

export class HandlerNotFoundError extends ApplicationError {
  private static readonly code = "handler_not_found_error";

  public constructor() {
    super({
      message: "Handler not found error",
      code: HandlerNotFoundError.code,
    });
  }

  public static getCode(): string {
    return HandlerNotFoundError.code;
  }

  public static create(): HandlerNotFoundError {
    return new HandlerNotFoundError();
  }
}
