import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class AdminSchema {
  @ApiProperty()
  @IsString()
  public userId!: string;

  @ApiProperty()
  @IsString()
  public cpf!: string;
}
