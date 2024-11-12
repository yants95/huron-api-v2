import { z } from "zod";

export const patientSchema = z.object({
  id: z.string().ulid(),
  name: z.string(),
  email: z.string(),
  age: z.number(),
  height: z.string(),
  weight: z.string(),
  document: z.string(),
  gender: z.string().optional(),
  phone: z.string(),
  cep: z.string(),
  address: z.string(),
  birthDate: z.string(),
  responsibleName: z.string().optional(),
  responsibleDocument: z.string().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date().optional()
});

export type PatientModel = z.TypeOf<typeof patientSchema>;
