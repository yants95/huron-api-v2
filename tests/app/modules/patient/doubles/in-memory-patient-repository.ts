import { InMemoryRepository } from "!tests/core/domain/repositories/in-memory-repository";
import { Patient } from "#/modules/patient/domain/entities/patient";
import { PatientRepository } from "#/modules/patient/domain/repositories/patient.repository";

export class InMemoryPatientRepository extends InMemoryRepository<Patient> implements PatientRepository
{
  async findByDocument(document: string): Promise<Patient | null> {
    const patient = this.items.find((patient) => patient.getPropsCopy().document === document);
    return patient ?? null;
  }
}
