import { z } from "zod";

export const scheduleSchema = z.object({
  id: z.string().ulid(),
  doctorId: z.string().ulid(),
  patientId: z.string().ulid(),
  doctorScheduleId: z.string().ulid(),
  createdAt: z.coerce.date(),
});

export type ScheduleModel = z.TypeOf<typeof scheduleSchema>;
