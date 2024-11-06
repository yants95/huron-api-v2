import { Repository } from "#/core/domain/repository";
import { Patient } from "#/modules/patient/domain/entities/patient";

export abstract class PatientRepository extends Repository<Patient> {
  public abstract insert(entity: Patient): Promise<void>;

  public abstract findByDocument(document: string): Promise<Patient | null>;
}