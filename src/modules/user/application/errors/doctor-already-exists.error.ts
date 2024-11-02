import { ApplicationError } from "#/core/application/errors/application.error.base";

export class DoctorAlreadyExistsError extends ApplicationError {
  private static readonly code = "doctor_already_exists_error";

  public constructor() {
    super({
      message: "Doctor already exists error",
      code: DoctorAlreadyExistsError.code,
    });
  }

  public static getCode(): string {
    return DoctorAlreadyExistsError.code;
  }

  public static create(): DoctorAlreadyExistsError {
    return new DoctorAlreadyExistsError();
  }
}
