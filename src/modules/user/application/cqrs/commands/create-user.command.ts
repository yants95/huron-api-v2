import { Command } from "#/core/application/cqrs/command";
import { UserStatus } from "#/modules/user/domain/enum/user-status";
import { UserType } from "#/modules/user/domain/enum/user-type";

interface Admin {
  userId: string;
  cpf: string;
}

export class CreateUserCommand extends Command {
  public constructor(
    public name: string,
    public email: string,
    public password: string,
    public userType?: UserType,
    public status?: UserStatus,
    public admin?: Admin
  ) {
    super();
  }
}