import { UserType } from "#/modules/user/domain/enum/user-type";

interface AdminProps {
  document: string;
}

interface SecretaryProps {
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
  type: UserType;
  admin?: AdminProps;
  doctor?: DoctorProps;
  secretary?: SecretaryProps;
}

export class CreateUserCommand {
  public constructor(public props: UserCommandProps) {}
}