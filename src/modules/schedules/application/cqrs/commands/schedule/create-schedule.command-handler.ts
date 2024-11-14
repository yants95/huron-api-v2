import { Either, left, right } from "#/core/types/either";
import { PatientRepository } from "#/modules/patient/domain/repositories/patient.repository";
import { PatientId } from "#/modules/patient/domain/value-objects/patient-id";
import { PatientRepositorySymbol } from "#/modules/patient/infrastructure/di/patient.di-token";
import { CreateScheduleCommand } from "#/modules/schedules/application/cqrs/commands/schedule/create-schedule.command";
import { DoctorNotFoundError } from "#/modules/schedules/application/errors/doctor-not-found.error";
import { DoctorScheduleNotFoundError } from "#/modules/schedules/application/errors/doctor-schedule-not-found.error";
import { DoctorScheduleUnavailableError } from "#/modules/schedules/application/errors/doctor-schedule-unavailable.error";
import { PatientAlreadyBooked } from "#/modules/schedules/application/errors/patient-already-booked.error";
import { PatientNotFoundError } from "#/modules/schedules/application/errors/patient-not-found.error";
import { Schedule } from "#/modules/schedules/domain/entities/schedule";
import { DoctorScheduleRepository } from "#/modules/schedules/domain/repositories/doctor-schedule.repository";
import { ScheduleRepository } from "#/modules/schedules/domain/repositories/schedule.repository";
import { DoctorScheduleId } from "#/modules/schedules/domain/value-objects/doctor-schedule-id";
import { DoctorScheduleRepositorySymbol, ScheduleRepositorySymbol } from "#/modules/schedules/infrastructure/di/doctor-schedule.di-token";
import { DoctorRepository } from "#/modules/user/domain/repositories/doctor.repository";
import { DoctorId } from "#/modules/user/domain/value-objects/doctor-id";
import { DoctorRepositorySymbol } from "#/modules/user/infrastructure/di/user.di-token";
import { Inject, Injectable } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";

export type CreateScheduleCommandError = 
  PatientNotFoundError |
  DoctorNotFoundError |
  DoctorScheduleNotFoundError |
  PatientAlreadyBooked |
  DoctorScheduleUnavailableError;
export type CreateScheduleCommandResult = Either<CreateScheduleCommandError, void>;

@CommandHandler(CreateScheduleCommand)
@Injectable()
export class CreateScheduleCommandHandler implements ICommandHandler<CreateScheduleCommand> {
  public constructor(
    @Inject(PatientRepositorySymbol)
    private readonly patientsRepository: PatientRepository,
    @Inject(DoctorRepositorySymbol)
    private readonly doctorsRepository: DoctorRepository,
    @Inject(DoctorScheduleRepositorySymbol)
    private readonly doctorSchedulesRepository: DoctorScheduleRepository,
    @Inject(ScheduleRepositorySymbol)
    private readonly schedulesRepository: ScheduleRepository
  ) {}

  async execute(command: CreateScheduleCommand): Promise<CreateScheduleCommandResult> {
    const { patientId, doctorId, doctorScheduleId } = command;
    const foundPatient = await this.patientsRepository.findOne(patientId);
    if (!foundPatient) return left(PatientNotFoundError.create(patientId));

    const foundDoctor = await this.doctorsRepository.findOne(doctorId);
    if (!foundDoctor) return left(DoctorNotFoundError.create(doctorId));

    const foundDoctorSchedule = await this.doctorSchedulesRepository.findOne(doctorScheduleId);
    if (!foundDoctorSchedule) return left(DoctorScheduleNotFoundError.create(doctorScheduleId));

    const isPatientAlreadyBooked =
      await this.schedulesRepository.findByPatientAndDoctorId(
        patientId,
        doctorId
      );
    if (isPatientAlreadyBooked) 
      return left(PatientAlreadyBooked.create(
        foundPatient.getName(), `${foundDoctorSchedule.getDate()} at ${foundDoctorSchedule.getTime()}`)
      );

    const doctorSchedule = await this.doctorSchedulesRepository.findOne(doctorScheduleId);
    if (doctorSchedule?.isUnavailable()) return left(DoctorScheduleUnavailableError.create(doctorScheduleId));

    doctorSchedule?.book(new Date());
    const schedule = Schedule.create({
      doctorId: DoctorId.create(doctorId),
      patientId: PatientId.create(patientId),
      doctorScheduleId: DoctorScheduleId.create(doctorScheduleId)
    });

    await this.schedulesRepository.insert(schedule);
    await this.doctorSchedulesRepository.update(doctorSchedule!);

    return right(undefined);
  }
}