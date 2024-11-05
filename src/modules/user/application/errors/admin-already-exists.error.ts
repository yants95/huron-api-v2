import { ApplicationError } from "#/core/application/errors/application.error.base";

export class AdminAlreadyExistsError extends ApplicationError {
  private static readonly code = "admin_already_exists_error";

  public constructor() {
    super({
      message: "Admin already exists error",
      code: AdminAlreadyExistsError.code,
    });
  }

  public static getCode(): string {
    return AdminAlreadyExistsError.code;
  }

  public static create(): AdminAlreadyExistsError {
    return new AdminAlreadyExistsError();
  }
}
