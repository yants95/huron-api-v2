import { Command, CommandType } from "#/core/application/cqrs/command";

interface UserMediatorProps {
  user: CommandType;
  admin: CommandType;
}

export class CreateUserMediatorCommand implements Command {
  public type = CommandType.admin;

  public constructor(public props: UserMediatorProps) {}
}