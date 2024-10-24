export interface ApplicationErrorInterface {
  code: string;
  message: string;
}

export abstract class ApplicationError extends Error {
  public readonly message: string;

  public readonly code: string;

  public constructor(error: ApplicationErrorInterface) {
    super(error.message);
    this.message = error.message;
    this.code = error.code;
  }

  public getCode(): string {
    return this.code;
  }

  public toPlain(): ApplicationErrorInterface {
    const { code, message } = this;

    return { code, message };
  }
}
