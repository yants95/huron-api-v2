import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class SecretarySchema {
  @ApiProperty()
  @IsString()
  public document!: string;
}