import { Repository } from "#/core/domain/repository";
import { Doctor } from "#/modules/user/domain/entities/doctor";

export abstract class DoctorRepository extends Repository<Doctor> {
  public abstract insert(entity: Doctor): Promise<void>;

  public abstract findByDocument(document: string): Promise<Doctor | null>;

  public abstract findByCRM(document: string): Promise<Doctor | null>;
}
