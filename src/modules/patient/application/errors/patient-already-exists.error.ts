import { ApplicationError } from "#/core/application/errors/application.error.base";

export class PatientAlreadyExistsError extends ApplicationError {
  private static readonly code = "patient_already_exists_error";

  public constructor() {
    super({
      message: "Patient already exists error",
      code: PatientAlreadyExistsError.code,
    });
  }

  public static getCode(): string {
    return PatientAlreadyExistsError.code;
  }

  public static create(): PatientAlreadyExistsError {
    return new PatientAlreadyExistsError();
  }
}
