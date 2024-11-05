import { ApplicationError } from "#/core/application/errors/application.error.base";
import { HttpStatusCodes } from "#/core/infrastructure/http/enum/http-status-code.enum";
import { Newable } from "#/core/types/common-types";
import { Either } from "#/core/types/either";
import { HttpException } from "@nestjs/common";

interface AddExceptionsParams {
  exception: Newable<ApplicationError> & { getCode: () => string };
  statusCode: HttpStatusCodes;
}

export class HttpController {
  private readonly exceptionsMap = new Map<string, HttpStatusCodes>([]);

  protected unwrapResult<Data = unknown>(
    result: Either<ApplicationError, Data>,
  ): Data {
    if (result.isLeft()) {
      throw new HttpException(
        result.value.toPlain(),
        this.exceptionsMap.get(result.value.getCode()) as number,
      );
    }

    return result.value;
  }

  protected mapExceptions(params: AddExceptionsParams[]): void {
    params.forEach((param) =>
      this.exceptionsMap.set(param.exception.getCode(), param.statusCode),
    );
  }
}
