import { Command, CommandProps } from "#/core/application/cqrs/command";

export interface SchedulesProps {
  date: string;
  time: string;
}

export class CreateDoctorScheduleCommand extends Command {
  public readonly doctorId: string;

  public readonly schedules: SchedulesProps[];

  public constructor(props: CommandProps<CreateDoctorScheduleCommand>) {
    super({ ...props });
    this.doctorId = props.doctorId;
    this.schedules = props.schedules;
  }
}