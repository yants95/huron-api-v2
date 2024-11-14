import { ApplicationError } from "#/core/application/errors/application.error.base";

export class DoctorScheduleNotFoundError extends ApplicationError {
  private static readonly code = "doctor_schedule_not_found_error";

  public constructor(message: string) {
    super({
      message,
      code: DoctorScheduleNotFoundError.code,
    });
  }

  public static getCode(): string {
    return DoctorScheduleNotFoundError.code;
  }

  public static create(doctorScheduleId: string): DoctorScheduleNotFoundError {
    return new DoctorScheduleNotFoundError(doctorScheduleId);
  }
}
