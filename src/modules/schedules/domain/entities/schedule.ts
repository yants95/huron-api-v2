import { Entity } from "#/core/domain/entities/entity";
import { Ulid } from "#/core/domain/value-objects/ulid";
import { PatientId } from "#/modules/patient/domain/value-objects/patient-id";
import { ScheduleCreatedDomainEvent } from "#/modules/schedules/domain/events/schedule-created.domain-event";
import { DoctorScheduleId } from "#/modules/schedules/domain/value-objects/doctor-schedule-id";
import { ScheduleId } from "#/modules/schedules/domain/value-objects/schedule-id";
import { DoctorId } from "#/modules/user/domain/value-objects/doctor-id";

interface ConstructorProperties {
  id: ScheduleId;
  props: ScheduleProps;
}

export interface CreateScheduleProps {
  doctorId: DoctorId;
  patientId: PatientId;
  doctorScheduleId: DoctorScheduleId;
}

export interface ScheduleProps {
  doctorId: DoctorId;
  patientId: PatientId;
  doctorScheduleId: DoctorScheduleId;
  createdAt: Date;
  updatedAt?: Date;
}

export type RestoreScheduleProps = ConstructorProperties;

export class Schedule extends Entity<ScheduleProps> {
  protected entityId!: ScheduleId;

  private constructor({ id, props }: ConstructorProperties) {
    super({ id, props });
    this.entityId = id;
  }

  public static create(props: CreateScheduleProps): Schedule {
    const createScheduleProps: ConstructorProperties = {
      id: ScheduleId.create(Ulid.new()),
      props: {
        ...props,
        createdAt: new Date(),
      }
    };
    const schedule = new Schedule(createScheduleProps);
    schedule.addEvent(
      new ScheduleCreatedDomainEvent({
        patientId: props.patientId,
        doctorId: props.doctorId,
        doctorScheduleId: props.doctorScheduleId,
      })
    );

    return schedule;
  }

  public static restore(props: RestoreScheduleProps): Schedule {
    return new Schedule(props);
  }

  public getDoctorId(): DoctorId {
    return this.props.doctorId;
  }

  public getPatientId(): PatientId {
    return this.props.patientId;
  }

  public getDoctorScheduleId(): DoctorScheduleId {
    return this.props.doctorScheduleId;
  }
}