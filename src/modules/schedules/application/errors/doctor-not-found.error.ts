import { ApplicationError } from "#/core/application/errors/application.error.base";

export class DoctorNotFoundError extends ApplicationError {
  private static readonly code = "doctor_not_found_error";

  public constructor(message: string) {
    super({
      message,
      code: DoctorNotFoundError.code,
    });
  }

  public static getCode(): string {
    return DoctorNotFoundError.code;
  }

  public static create(doctorId: string): DoctorNotFoundError {
    return new DoctorNotFoundError(doctorId);
  }
}
