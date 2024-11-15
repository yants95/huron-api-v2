import { DomainEvent } from "#/core/domain/events/domain-event";
import { PatientId } from "#/modules/patient/domain/value-objects/patient-id";
import { DoctorScheduleId } from "#/modules/schedules/domain/value-objects/doctor-schedule-id";
import { DoctorId } from "#/modules/user/domain/value-objects/doctor-id";

export class ScheduleCreatedDomainEvent extends DomainEvent {
  public readonly patientId: PatientId;

  public readonly doctorId: DoctorId;

  public readonly doctorScheduleId: DoctorScheduleId;

  public constructor(data: { patientId: PatientId; doctorId: DoctorId; doctorScheduleId: DoctorScheduleId }) {
    super();
    this.patientId = data.patientId;
    this.doctorId = data.doctorId;
    this.doctorScheduleId = data.doctorScheduleId;
  }

  getName(): string {
    return ScheduleCreatedDomainEvent.name;
  }
}