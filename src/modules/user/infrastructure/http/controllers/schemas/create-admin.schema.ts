import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class AdminSchema {
  @ApiProperty()
  @IsString()
  public document!: string;
}
