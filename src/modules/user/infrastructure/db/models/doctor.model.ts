import { z } from "zod";

export const doctorSchema = z.object({
  id: z.string().ulid(),
  userId: z.string().ulid(),
  document: z.string(),
  crm: z.string(),
  specialty: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date().optional()
});

export type DoctorModel = z.TypeOf<typeof doctorSchema>;
