import { InMemoryRepository } from "!tests/core/domain/repositories/in-memory-repository";
import { Doctor } from "#/modules/user/domain/entities/doctor";
import { DoctorRepository } from "#/modules/user/domain/repositories/doctor.repository";

export class InMemoryDoctorRepository extends InMemoryRepository<Doctor> implements DoctorRepository {
  public async findByDocument(document: string): Promise<Doctor | null> {
    const doctor = this.items.find((doctor) => doctor.getPropsCopy().document === document);
    return doctor ?? null;
  }
  public async findByCRM(crm: string): Promise<Doctor | null> {
    const doctor = this.items.find((doctor) => doctor.getPropsCopy().crm === crm);
    return doctor ?? null;
  }
}
