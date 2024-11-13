import { Either, left, right } from "#/core/types/either";
import { CreateDoctorScheduleCommand } from "#/modules/schedules/application/cqrs/commands/doctor-schedule/create-doctor-schedule.command";
import { DoctorScheduleAlreadyExistsError } from "#/modules/schedules/application/errors/schedule-already-exists.error";
import { DoctorSchedule } from "#/modules/schedules/domain/entities/doctor-schedule";
import { DoctorScheduleRepository } from "#/modules/schedules/domain/repositories/doctor-schedule.repository";
import { DoctorScheduleId } from "#/modules/schedules/domain/value-objects/doctor-schedule-id";
import { DoctorScheduleRepositorySymbol } from "#/modules/schedules/infrastructure/di/doctor-schedule.di-token";
import { Inject, Injectable } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";

export type CreateDoctorScheduleCommandResult = Either<DoctorScheduleAlreadyExistsError, void>;

@CommandHandler(CreateDoctorScheduleCommand)
@Injectable()
export class CreateDoctorScheduleCommandHandler implements ICommandHandler<CreateDoctorScheduleCommand> {
  public constructor(
    @Inject(DoctorScheduleRepositorySymbol)
    private readonly doctorSchedulesRepository: DoctorScheduleRepository
  ) {}

  async execute(command: CreateDoctorScheduleCommand): Promise<CreateDoctorScheduleCommandResult> {
    const schedulesExists = await this.doctorSchedulesRepository.findDoctorSchedule({
      doctorId: command.doctorId,
      schedules: command.schedules
    });
    if (schedulesExists.length > 0) {
      return left(DoctorScheduleAlreadyExistsError.create(this.#buildScheduleResponse(schedulesExists)));
    }
    const doctorSchedules = this.#buildSchedules(command);
    await Promise.all([
      doctorSchedules.map((doctorSchedule) => this.doctorSchedulesRepository.insert(doctorSchedule))
    ]);

    return right(undefined);
  }

  #buildSchedules(command: CreateDoctorScheduleCommand): DoctorSchedule[] {
    const { schedules, doctorId } = command;
    const doctorSchedules = schedules.map((schedule) => {
      return DoctorSchedule.create({
        doctorId: DoctorScheduleId.create(doctorId),
        date: schedule.date,
        time: schedule.time,
      })
    });

    return doctorSchedules;
  }

  #buildScheduleResponse(doctorSchedules: DoctorSchedule[]): string[] {
    return doctorSchedules.map(schedule => `${schedule.getDate()} - ${schedule.getTime()}`);
  }
}