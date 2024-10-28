export class Command {
  type: CommandType;
}

export enum CommandType {
  user = "user",
  admin = "admin",
}