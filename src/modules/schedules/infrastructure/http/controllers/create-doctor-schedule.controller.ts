import { HttpController } from "#/core/infrastructure/http/controllers/http.controller";
import { HttpStatusCodes } from "#/core/infrastructure/http/enum/http-status-code.enum";
import { DoctorScheduleAlreadyExistsError } from "#/modules/schedules/application/errors/schedule-already-exists.error";
import { CreateDoctorScheduleRequest } from "#/modules/schedules/infrastructure/http/controllers/request/create-doctor-schedule.request";
import {
  Body,
  Controller,
  Post,
} from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("/doctor-schedules")
@Controller({ path: "/doctor-schedules", version: "1" })
export class CreateDoctorScheduleController extends HttpController {
  private static readonly mappedExceptions = [
    {
      exception: DoctorScheduleAlreadyExistsError,
      statusCode: HttpStatusCodes.UNPROCESSABLE_ENTITY,
    },
  ];

  constructor(private readonly commandBus: CommandBus) {
    super();
    this.mapExceptions(CreateDoctorScheduleController.mappedExceptions)
  }

  @Post()
  async handle(@Body() body: CreateDoctorScheduleRequest): Promise<void> {
    const response = await this.commandBus.execute(body.toCommand());
    return this.unwrapResult(response);
  }
}
