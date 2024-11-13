import { InMemoryRepository } from "!tests/core/domain/repositories/in-memory-repository";
import { DoctorSchedule } from "#/modules/schedules/domain/entities/doctor-schedule";
import { DoctorScheduleRepository, SchedulesFilterProps } from "#/modules/schedules/domain/repositories/doctor-schedule.repository";

export class InMemoryDoctorScheduleRepository extends InMemoryRepository<DoctorSchedule> implements DoctorScheduleRepository
{
  public async findDoctorSchedule(filters: SchedulesFilterProps): Promise<DoctorSchedule[]> {
    const { doctorId, schedules } = filters;
    
    return this.items.filter((doctorSchedule) => {
      return doctorSchedule.getDoctorId().toString() === doctorId &&
        schedules.some((schedule) => 
          schedule.date === doctorSchedule.getDate() &&
          schedule.time === doctorSchedule.getTime())
    })
  }
}
