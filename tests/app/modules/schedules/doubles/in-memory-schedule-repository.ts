import { InMemoryRepository } from "!tests/core/domain/repositories/in-memory-repository";
import { Schedule } from "#/modules/schedules/domain/entities/schedule";
import { ScheduleRepository } from "#/modules/schedules/domain/repositories/schedule.repository";

export class InMemoryScheduleRepository extends InMemoryRepository<Schedule> implements ScheduleRepository
{
  public async findByPatientAndDoctorId(patientId: string, doctorId: string): Promise<Schedule | null> {
    const schedule = this.items.find((item) => {
      return item.getDoctorId().toString() === doctorId &&
        item.getPatientId().toString() === patientId
    });

    return schedule ?? null
  }
}
