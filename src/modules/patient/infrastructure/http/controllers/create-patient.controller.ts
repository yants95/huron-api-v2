import { HttpController } from "#/core/infrastructure/http/controllers/http.controller";
import { HttpStatusCodes } from "#/core/infrastructure/http/enum/http-status-code.enum";
import { PatientAlreadyExistsError } from "#/modules/patient/application/errors/patient-already-exists.error";
import { CreatePatientRequest } from "#/modules/patient/infrastructure/http/controllers/request/create-patient.request";
import {
  Body,
  Controller,
  Post,
} from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("/patients")
@Controller({ path: "patients", version: "1" })
export class CreatePatientController extends HttpController {
  private static readonly mappedExceptions = [
    {
      exception: PatientAlreadyExistsError,
      statusCode: HttpStatusCodes.UNPROCESSABLE_ENTITY,
    },
  ];
  constructor(private readonly commandBus: CommandBus) {
    super();
    this.mapExceptions(CreatePatientController.mappedExceptions);
  }

  @Post()
  async handle(@Body() body: CreatePatientRequest): Promise<void> {
    const response = await this.commandBus.execute(body.toCommand());
    return this.unwrapResult(response);
  }
}
