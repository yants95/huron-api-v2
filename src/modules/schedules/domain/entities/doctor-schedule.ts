import { Entity } from "#/core/domain/entities/entity";
import { Ulid } from "#/core/domain/value-objects/ulid";
import { DoctorScheduleStatus } from "#/modules/schedules/domain/enum/doctor-schedule-status.enum";
import { DoctorScheduleId } from "#/modules/schedules/domain/value-objects/doctor-schedule-id";
import { DoctorId } from "#/modules/user/domain/value-objects/doctor-id";

interface ConstructorProperties {
  id: DoctorScheduleId;
  props: DoctorScheduleProps;
}

export interface CreateDoctorScheduleProps {
  doctorId: DoctorId;
  date: string;
  time: string;
}

export interface DoctorScheduleProps {
  doctorId: DoctorId;
  date: string;
  time: string;
  status: DoctorScheduleStatus;
  createdAt: Date;
  updatedAt?: Date;
  bookedAt?: Date;
}

export type RestoreDoctorScheduleProps = ConstructorProperties;

export class DoctorSchedule extends Entity<DoctorScheduleProps> {
  protected entityId!: DoctorScheduleId;

  private constructor({ id, props }: ConstructorProperties) {
    super({ id, props });
    this.entityId = id;
  }

  public static create(props: CreateDoctorScheduleProps): DoctorSchedule {
    const createDoctorScheduleProps: ConstructorProperties = {
      id: DoctorScheduleId.create(Ulid.new()),
      props: {
        ...props,
        createdAt: new Date(),
        status: DoctorScheduleStatus.available
      }
    };

    return new DoctorSchedule(createDoctorScheduleProps);
  }

  public static restore(props: RestoreDoctorScheduleProps): DoctorSchedule {
    return new DoctorSchedule(props);
  }

  public getDoctorId(): DoctorId {
    return this.props.doctorId;
  }

  public getDate(): string {
    return this.props.date;
  }

  public getTime(): string {
    return this.props.time;
  }

  public isUnavailable(): boolean {
    return this.getStatus() === DoctorScheduleStatus.unavailable;
  }

  public getStatus(): DoctorScheduleStatus {
    if (this.props.bookedAt) return DoctorScheduleStatus.unavailable;
    return DoctorScheduleStatus.available;
  }

  public book(bookedAt: Date): void {
    this.props.status = DoctorScheduleStatus.unavailable;
    this.props.bookedAt = bookedAt;
  }
}