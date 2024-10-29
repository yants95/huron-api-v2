import { Entity } from "#/core/domain/entities/entity";
import { Ulid } from "#/core/domain/value-objects/ulid";
import { DoctorId } from "#/modules/user/domain/value-objects/doctor-id";
import { UserId } from "#/modules/user/domain/value-objects/user-id";

interface ConstructorProperties {
  id: DoctorId;
  props: DoctorProps;
}

export interface CreateDoctorProps {
  userId: UserId;
  document: string
  crm: string;
  specialty: string;
}

export interface DoctorProps {
  userId: UserId;
  document: string
  crm: string;
  specialty: string;
  createdAt: Date;
  updatedAt?: Date;
}

export type RestoreDoctorProps = ConstructorProperties;

export class Doctor extends Entity<DoctorProps> {
  private constructor({ id, props }: ConstructorProperties) {
    super({ id, props });
  }

  public static create(props: CreateDoctorProps): Doctor {
    const createDoctorProps: ConstructorProperties = {
      id: DoctorId.create(Ulid.new()),
      props: {
        ...props,
        createdAt: new Date()
      }
    };

    return new Doctor(createDoctorProps);
  }

  public static restore(props: RestoreDoctorProps): Doctor {
    return new Doctor(props);
  }
}