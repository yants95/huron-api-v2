import { Command } from "#/core/application/cqrs/command";
import { UserId } from "#/modules/user/domain/value-objects/user-id";

export class CreateAdminCommand extends Command {
  public constructor(
    public userId: UserId,
    public cpf: string,
  ) {
    super();
  }
}