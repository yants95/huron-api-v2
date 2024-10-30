import { Command } from "#/core/application/cqrs/command";
import { UserType } from "#/modules/user/domain/enum/user-type";
import { UserId } from "#/modules/user/domain/value-objects/user-id";

interface SecretaryCommandProps {
  userId: UserId;
  document: string;
}

export class CreateSecretaryCommand implements Command {
  public type = UserType.secretary;

  public constructor(public props: SecretaryCommandProps) {}
}