import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class DoctorSchema {
  @ApiProperty()
  @IsString()
  public document!: string;

  @ApiProperty()
  @IsString()
  public crm!: string;

  @ApiProperty()
  @IsString()
  public specialty!: string;
}
