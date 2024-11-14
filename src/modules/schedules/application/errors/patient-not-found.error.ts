import { ApplicationError } from "#/core/application/errors/application.error.base";

export class PatientNotFoundError extends ApplicationError {
  private static readonly code = "patient_not_found_error";

  public constructor(message: string) {
    super({
      message,
      code: PatientNotFoundError.code,
    });
  }

  public static getCode(): string {
    return PatientNotFoundError.code;
  }

  public static create(patientId: string): PatientNotFoundError {
    return new PatientNotFoundError(patientId);
  }
}
