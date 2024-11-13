import { DoctorScheduleStatus } from "#/modules/schedules/domain/enum/doctor-schedule-status.enum";
import { z } from "zod";

export const doctorScheduleSchema = z.object({
  id: z.string().ulid(),
  doctorId: z.string().ulid(),
  date: z.string(),
  time: z.string(),
  status: z.nativeEnum(DoctorScheduleStatus),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date().optional()
});

export type DoctorScheduleModel = z.TypeOf<typeof doctorScheduleSchema>;
