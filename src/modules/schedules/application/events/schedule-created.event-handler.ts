import { PatientRepository } from "#/modules/patient/domain/repositories/patient.repository";
import { PatientRepositorySymbol } from "#/modules/patient/infrastructure/di/patient.di-token";
import { ScheduleCreatedDomainEvent } from "#/modules/schedules/domain/events/schedule-created.domain-event";
import { DoctorScheduleRepository } from "#/modules/schedules/domain/repositories/doctor-schedule.repository";
import { DoctorScheduleRepositorySymbol } from "#/modules/schedules/infrastructure/di/doctor-schedule.di-token";
import { DoctorRepository } from "#/modules/user/domain/repositories/doctor.repository";
import { DoctorRepositorySymbol } from "#/modules/user/infrastructure/di/user.di-token";
import { Inject } from "@nestjs/common";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";

@EventsHandler(ScheduleCreatedDomainEvent)
export class ScheduleCreatedEventHandler implements IEventHandler<ScheduleCreatedDomainEvent> {
  public constructor(
    @Inject(PatientRepositorySymbol) private readonly patientsRepository: PatientRepository,
    @Inject(DoctorRepositorySymbol) private readonly doctorsRepository: DoctorRepository,
    @Inject(DoctorScheduleRepositorySymbol) private readonly doctorSchedulesRepository: DoctorScheduleRepository,
  ) {}

  public async handle(event: ScheduleCreatedDomainEvent) {
    const patient = await this.patientsRepository.findOne(event.patientId.toString());
    const doctor = await this.doctorsRepository.findOne(event.doctorId.toString());
    const doctorSchedule = await this.doctorSchedulesRepository.findOne(event.doctorScheduleId.toString());

    // TO-DO send mail to patient about the schedule booked
  }
}