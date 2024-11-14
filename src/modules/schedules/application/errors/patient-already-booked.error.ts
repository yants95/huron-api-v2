import { ApplicationError } from "#/core/application/errors/application.error.base";

export class PatientAlreadyBooked extends ApplicationError {
  private static readonly code = "patient_already_booked_error";

  public constructor(message: string) {
    super({
      message,
      code: PatientAlreadyBooked.code,
    });
  }

  public static getCode(): string {
    return PatientAlreadyBooked.code;
  }

  public static create(patientId: string, scheduleId: string): PatientAlreadyBooked {
    const message = `Patient ${patientId} is already booked in schedule ${scheduleId}`;
    return new PatientAlreadyBooked(message);
  }
}
