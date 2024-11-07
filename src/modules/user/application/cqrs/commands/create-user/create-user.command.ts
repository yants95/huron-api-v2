import { Command, CommandProps } from "#/core/application/cqrs/command";
import { UserType } from "#/modules/user/domain/enum/user-type";

interface AdminPrimitives {
  document: string;
}

interface SecretaryPrimitives {
  document: string;
}

interface DoctorPrimitives {
  document: string;
  crm: string;
  specialty: string;
}

export class CreateUserCommand extends Command {
  public readonly name: string;

  public readonly password: string;

  public readonly email: string;

  public readonly type: UserType;

  public readonly admin?: AdminPrimitives;

  public readonly doctor?: DoctorPrimitives;

  public readonly secretary?: SecretaryPrimitives;
  
  public constructor(props: CommandProps<CreateUserCommand>) {
    super({ ...props });
    this.name = props.name;
    this.password = props.password;
    this.email = props.email;
    this.admin = props.admin;
    this.doctor = props.doctor;
    this.secretary = props.secretary;
  }

}