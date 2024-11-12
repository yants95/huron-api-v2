import { Command, CommandProps } from "#/core/application/cqrs/command";
import { UserType } from "#/modules/user/domain/enum/user-type";

export class CreateSecretaryCommand extends Command {
  public readonly type = UserType.secretary;

  public readonly userId: string;

  public readonly document: string;

  public constructor(props: CommandProps<CreateSecretaryCommand>) {
    super(props);
    this.userId = props.userId;
    this.document = props.document;
  }

  public static getName(): string {
    return "create_secretary.command";
  }

  public readonly getName = (): string => CreateSecretaryCommand.getName();
}