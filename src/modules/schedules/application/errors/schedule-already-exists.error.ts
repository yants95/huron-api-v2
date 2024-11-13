import { ApplicationError } from "#/core/application/errors/application.error.base";

export class DoctorScheduleAlreadyExistsError extends ApplicationError {
  private static readonly code = "doctor_schedule_already_exists_error";

  public constructor(message: string) {
    super({
      message,
      code: DoctorScheduleAlreadyExistsError.code,
    });
  }

  public static getCode(): string {
    return DoctorScheduleAlreadyExistsError.code;
  }

  public static create(doctorSchedules: string[]): DoctorScheduleAlreadyExistsError {
    const message = `The following schedules already exist: ${doctorSchedules.map((doctorSchedule) => doctorSchedule).join(', ')}`;

    return new DoctorScheduleAlreadyExistsError(message);
  }
}
