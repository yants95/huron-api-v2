import { Command } from "#/core/application/cqrs/command";
import { UserType } from "#/modules/user/domain/enum/user-type";
import { UserId } from "#/modules/user/domain/value-objects/user-id";

interface AdminCommandProps {
  userId: UserId;
  document: string;
}

export class CreateAdminCommand implements Command {
  public type = UserType.admin;

  public constructor(public props: AdminCommandProps) {}
}