import { HttpController } from "#/core/infrastructure/http/controllers/http.controller";
import { HttpStatusCodes } from "#/core/infrastructure/http/enum/http-status-code.enum";
import { DoctorNotFoundError } from "#/modules/schedules/application/errors/doctor-not-found.error";
import { DoctorScheduleNotFoundError } from "#/modules/schedules/application/errors/doctor-schedule-not-found.error";
import { DoctorScheduleUnavailableError } from "#/modules/schedules/application/errors/doctor-schedule-unavailable.error";
import { PatientAlreadyBooked } from "#/modules/schedules/application/errors/patient-already-booked.error";
import { PatientNotFoundError } from "#/modules/schedules/application/errors/patient-not-found.error";
import { CreateScheduleRequest } from "#/modules/schedules/infrastructure/http/controllers/request/create-schedule.request";

import {
  Body,
  Controller,
  Post,
} from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("/schedules")
@Controller({ path: "/schedules", version: "1" })
export class CreateScheduleController extends HttpController {
  private static readonly mappedExceptions = [
    {
      exception: PatientNotFoundError,
      statusCode: HttpStatusCodes.UNPROCESSABLE_ENTITY,
    },
    {
      exception: DoctorNotFoundError,
      statusCode: HttpStatusCodes.UNPROCESSABLE_ENTITY,
    },
    {
      exception: DoctorScheduleNotFoundError,
      statusCode: HttpStatusCodes.UNPROCESSABLE_ENTITY,
    },
    {
      exception: PatientAlreadyBooked,
      statusCode: HttpStatusCodes.UNPROCESSABLE_ENTITY,
    },
    {
      exception: DoctorScheduleUnavailableError,
      statusCode: HttpStatusCodes.UNPROCESSABLE_ENTITY,
    },
  ];

  constructor(private readonly commandBus: CommandBus) {
    super();
    this.mapExceptions(CreateScheduleController.mappedExceptions)
  }

  @Post()
  async handle(@Body() body: CreateScheduleRequest): Promise<void> {
    const response = await this.commandBus.execute(body.toCommand());
    return this.unwrapResult(response);
  }
}
