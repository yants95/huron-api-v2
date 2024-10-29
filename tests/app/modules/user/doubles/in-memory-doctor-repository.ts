import { InMemoryRepository } from "!tests/core/domain/repositories/in-memory-repository";
import { Doctor } from "#/modules/user/domain/entities/doctor";
import { DoctorRepository } from "#/modules/user/domain/repositories/doctor.repository";

export class InMemoryDoctorRepository extends InMemoryRepository<Doctor> implements DoctorRepository {}
