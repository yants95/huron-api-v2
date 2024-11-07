import { Command, CommandProps } from "#/core/application/cqrs/command";
import { UserType } from "#/modules/user/domain/enum/user-type";

export class CreateAdminCommand extends Command {
  public readonly type = UserType.admin;

  public readonly userId: string;
  
  public readonly document: string;

  public constructor(props: CommandProps<CreateAdminCommand>) {
    super({ ...props });
    this.userId = props.userId;
    this.document = props.document;
  }
}