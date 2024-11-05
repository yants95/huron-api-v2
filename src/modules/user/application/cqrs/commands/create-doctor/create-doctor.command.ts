import { Command } from "#/core/application/cqrs/command";
import { UserType } from "#/modules/user/domain/enum/user-type";
import { UserId } from "#/modules/user/domain/value-objects/user-id";

export interface DoctorCommandProps {
  userId: UserId;
  document: string;
  crm: string;
  specialty: string;
}

export class CreateDoctorCommand implements Command {
  public readonly type = UserType.doctor;

  public constructor(public props: DoctorCommandProps) {}
}