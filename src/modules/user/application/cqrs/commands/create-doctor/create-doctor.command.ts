import { Command, CommandProps } from "#/core/application/cqrs/command";
import { UserType } from "#/modules/user/domain/enum/user-type";

export class CreateDoctorCommand extends Command {
  public readonly type = UserType.doctor;

  public readonly userId: string;

  public readonly document: string;

  public readonly crm: string;

  public readonly specialty: string;

  public constructor(props: CommandProps<CreateDoctorCommand>) {
    super({ ...props });
    this.userId = props.userId;
    this.document = props.document;
    this.crm = props.crm;
    this.specialty = props.specialty;
  }
}