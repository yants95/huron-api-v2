import { Command, CommandType } from "#/core/application/cqrs/command";

interface AdminProps {
  document: string;
}

interface DoctorProps {
  document: string;
  crm: string;
  specialty: string;
}

export interface UserCommandProps {
  name: string;
  password: string;
  email: string;
  admin?: AdminProps;
  doctor?: DoctorProps;
}

export class CreateUserCommand implements Command {
  public readonly type = CommandType.user;

  public constructor(public props: UserCommandProps) {}
}