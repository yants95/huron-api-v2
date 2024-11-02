import { HttpController } from "#/core/infrastructure/http/controllers/http.controller";
import { HttpStatusCodes } from "#/core/infrastructure/http/enum/http-status-code.enum";
import { AdminAlreadyExistsError } from "#/modules/user/application/errors/admin-already-exists.error";
import { DoctorAlreadyExistsError } from "#/modules/user/application/errors/doctor-already-exists.error";
import { SecretaryAlreadyExistsError } from "#/modules/user/application/errors/secretary-already-exists.error";
import { UserAlreadyExistsError } from "#/modules/user/application/errors/user-already-exists.error";
import { CreateUserRequest } from "#/modules/user/infrastructure/http/controllers/request/create-user.request";
import {
  Body,
  Controller,
  Post,
} from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("/users")
@Controller({ path: "users", version: "1" })
export class CreateUserController extends HttpController {
  private static readonly mappedExceptions = [
    {
      exception: UserAlreadyExistsError,
      statusCode: HttpStatusCodes.UNPROCESSABLE_ENTITY,
    },
    {
      exception: AdminAlreadyExistsError,
      statusCode: HttpStatusCodes.UNPROCESSABLE_ENTITY,
    },
    {
      exception: DoctorAlreadyExistsError,
      statusCode: HttpStatusCodes.UNPROCESSABLE_ENTITY,
    },
    {
      exception: SecretaryAlreadyExistsError,
      statusCode: HttpStatusCodes.UNPROCESSABLE_ENTITY,
    },
  ];
  constructor(private readonly commandBus: CommandBus) {
    super();
    this.mapExceptions(CreateUserController.mappedExceptions);
  }

  @Post()
  async handle(@Body() body: CreateUserRequest): Promise<void> {
    const response = await this.commandBus.execute(body.toCommand());
    return this.unwrapResult(response);
  }
}
