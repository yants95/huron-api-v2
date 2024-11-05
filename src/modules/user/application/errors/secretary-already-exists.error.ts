import { ApplicationError } from "#/core/application/errors/application.error.base";

export class SecretaryAlreadyExistsError extends ApplicationError {
  private static readonly code = "secretary_already_exists_error";

  public constructor() {
    super({
      message: "Secretary already exists error",
      code: SecretaryAlreadyExistsError.code,
    });
  }

  public static getCode(): string {
    return SecretaryAlreadyExistsError.code;
  }

  public static create(): SecretaryAlreadyExistsError {
    return new SecretaryAlreadyExistsError();
  }
}
