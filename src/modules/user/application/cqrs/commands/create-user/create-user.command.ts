import { Command, CommandType } from "#/core/application/cqrs/command";

interface AdminProps {
  document: string;
}

export interface UserCommandProps {
  name: string;
  password: string;
  email: string;
  admin?: AdminProps;
}

export class CreateUserCommand implements Command {
  public readonly type = CommandType.user;

  public constructor(public props: UserCommandProps) {}
}