import { Command } from "#/core/application/cqrs/command";
import { Admin } from "#/modules/user/domain/entities/admin";

export class CreateUserCommand extends Command {
  public constructor(
    public name: string,
    public email: string,
    public password: string,
    public admin?: Admin
  ) {
    super();
  }
}