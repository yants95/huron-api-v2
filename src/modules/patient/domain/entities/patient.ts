import { Entity } from "#/core/domain/entities/entity";
import { Ulid } from "#/core/domain/value-objects/ulid";
import { PatientId } from "#/modules/patient/domain/value-objects/patient-id";

interface ConstructorProperties {
  id: PatientId;
  props: PatientProps;
}

export interface CreatePatientProps {
  name: string;
  email: string;
  age: number;
  height: string;
  weight: string;
  document: string;
  gender?: string;
  phone: string;
  cep: string;
  address: string;
  birthDate: string;
  responsibleName?: string;
  responsibleDocument?: string;
}

export interface PatientProps extends CreatePatientProps {
  createdAt: Date;
  updatedAt?: Date;
}

export type RestorePatientProps = ConstructorProperties;

export class Patient extends Entity<PatientProps> {
  protected entityId!: PatientId;

  private constructor({ id, props }: ConstructorProperties) {
    super({ id, props });
    this.entityId = id;
  }

  public static create(props: CreatePatientProps): Patient {
    const createPatientProps: ConstructorProperties = {
      id: PatientId.create(Ulid.new()),
      props: {
        ...props,
        createdAt: new Date(),
      }
    };

    return new Patient(createPatientProps);
  }

  public static restore(props: RestorePatientProps): Patient {
    return new Patient(props);
  }
}