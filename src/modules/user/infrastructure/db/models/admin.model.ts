import { z } from "zod";

export const adminSchema = z.object({
  id: z.string().ulid(),
  userId: z.string().ulid(),
  document: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date().optional()
});

export type AdminModel = z.TypeOf<typeof adminSchema>;
