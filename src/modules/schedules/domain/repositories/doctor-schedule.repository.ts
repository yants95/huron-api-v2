import { Repository } from "#/core/domain/repository";
import { DoctorSchedule } from "#/modules/schedules/domain/entities/doctor-schedule";

interface SchedulesProps {
  date: string;
  time: string;
}


export interface SchedulesFilterProps {
  doctorId: string;
  schedules: SchedulesProps[];
}


export abstract class DoctorScheduleRepository extends Repository<DoctorSchedule> {
  public abstract insert(entity: DoctorSchedule): Promise<void>;

  public abstract findDoctorSchedule(filters: SchedulesFilterProps): Promise<DoctorSchedule[]>;
}