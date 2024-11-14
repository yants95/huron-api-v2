import { ApplicationError } from "#/core/application/errors/application.error.base";

export class DoctorScheduleUnavailableError extends ApplicationError {
  private static readonly code = "doctor_schedule_unavailable_error";

  public constructor(message: string) {
    super({
      message,
      code: DoctorScheduleUnavailableError.code,
    });
  }

  public static getCode(): string {
    return DoctorScheduleUnavailableError.code;
  }

  public static create(doctorScheduleId: string): DoctorScheduleUnavailableError {
    const message = `Doctor schedule ${doctorScheduleId} is unavailable`;
    return new DoctorScheduleUnavailableError(message);
  }
}
