import { Repository } from "#/core/domain/repository";
import { Schedule } from "#/modules/schedules/domain/entities/schedule";


export abstract class ScheduleRepository extends Repository<Schedule> {
  public abstract insert(entity: Schedule): Promise<void>;
  public abstract findByPatientAndDoctorId(
    patientId: string,
    doctorId: string
  ): Promise<Schedule | null>;
}