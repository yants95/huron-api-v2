import { Command, CommandProps } from "#/core/application/cqrs/command";

export class CreateScheduleCommand extends Command {
  public readonly doctorId: string;

  public readonly patientId: string;

  public readonly doctorScheduleId: string;

  public constructor(props: CommandProps<CreateScheduleCommand>) {
    super({ ...props });
    this.doctorId = props.doctorId;
    this.patientId = props.patientId;
    this.doctorScheduleId = props.doctorScheduleId;
  }
}