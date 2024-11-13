import { Type } from "class-transformer";
import { IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { CreateDoctorScheduleCommand } from "#/modules/schedules/application/cqrs/commands/doctor-schedule/create-doctor-schedule.command";

export class ScheduleSchema {
  @ApiProperty()
  @IsString()
  public date!: string;

  @ApiProperty()
  @IsString()
  public time!: string;
}

export class CreateDoctorScheduleRequest {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  public doctorId!: string;

  @ValidateNested()
  @Type(() => ScheduleSchema)
  @ApiProperty({
    type: ScheduleSchema,
  })
  public schedules!: ScheduleSchema[];

  public toCommand(): CreateDoctorScheduleCommand {
    return new CreateDoctorScheduleCommand({
      doctorId: this.doctorId,
      schedules: this.schedules
    });
  }
}
