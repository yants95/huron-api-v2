import { UserStatus } from "#/modules/user/domain/enum/user-status";
import { UserType } from "#/modules/user/domain/enum/user-type";
import { z } from "zod";

export const userSchema = z.object({
  id: z.string().ulid(),
  name: z.string(),
  password: z.string(),
  email: z.string(),
  type: z.nativeEnum(UserType).optional(),
  status: z.nativeEnum(UserStatus),
  createdAt: z.coerce.date(),
  firstAccessAt: z.coerce.date().nullable(),
  updatedAt: z.coerce.date().optional()
});

export type UserModel = z.TypeOf<typeof userSchema>;
