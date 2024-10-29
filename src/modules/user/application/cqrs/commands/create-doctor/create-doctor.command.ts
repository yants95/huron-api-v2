import { Command, CommandType } from "#/core/application/cqrs/command";
import { UserId } from "#/modules/user/domain/value-objects/user-id";

export interface DoctorCommandProps {
  userId: UserId;
  document: string;
  crm: string;
  specialty: string;
}

export class CreateDoctorCommand implements Command {
  public readonly type = CommandType.doctor;

  public constructor(public props: DoctorCommandProps) {}
}