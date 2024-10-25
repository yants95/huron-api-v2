import { ApplicationError } from "#/core/application/errors/application.error.base";

export class UserAlreadyExistsError extends ApplicationError {
  private static readonly code = "user_already_exists_error";

  public constructor() {
    super({
      message: "User already exists error",
      code: UserAlreadyExistsError.code,
    });
  }

  public static getCode(): string {
    return UserAlreadyExistsError.code;
  }

  public static create(): UserAlreadyExistsError {
    return new UserAlreadyExistsError();
  }
}
