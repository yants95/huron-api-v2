import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { CreateScheduleCommand } from "#/modules/schedules/application/cqrs/commands/schedule/create-schedule.command";

export class CreateScheduleRequest {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  public doctorId!: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  public doctorScheduleId!: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  public patientId!: string;

  public toCommand(): CreateScheduleCommand {
    return new CreateScheduleCommand(this);
  }
}
