import { Command } from "#/core/application/cqrs/command";
import { UserType } from "#/modules/user/domain/enum/user-type";

interface UserMediatorProps {
  user: UserType;
  admin: UserType;
  secretary: UserType;
}

export class CreateUserMediatorCommand implements Command {
  public type: UserType;

  public constructor(public props: UserMediatorProps) {}
}