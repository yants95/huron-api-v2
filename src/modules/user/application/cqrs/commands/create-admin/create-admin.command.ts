import { Command, CommandType } from "#/core/application/cqrs/command";
import { UserId } from "#/modules/user/domain/value-objects/user-id";

interface AdminCommandProps {
  userId: UserId;
  document: string;
}

export class CreateAdminCommand implements Command {
  public type = CommandType.admin;

  public constructor(public props: AdminCommandProps) {}
}