import { CreateDoctorScheduleCommandBuilder } from "!tests/app/modules/schedules/builders/create-doctor-schedule-command.builder";
import { DoctorScheduleBuilder } from "!tests/app/modules/schedules/builders/doctor-schedule.builder";
import { InMemoryDoctorScheduleRepository } from "!tests/app/modules/schedules/doubles/in-memory-doctor-schedule-repository";
import { CreateDoctorScheduleCommandHandler } from "#/modules/schedules/application/cqrs/commands/doctor-schedule/create-doctor-schedule.command-handler";

interface Sut {
  sut: CreateDoctorScheduleCommandHandler;
  doctorScheduleRepository: InMemoryDoctorScheduleRepository;
}

const makeSut = (): Sut => {
  const doctorScheduleRepository = new InMemoryDoctorScheduleRepository();
  const sut = new CreateDoctorScheduleCommandHandler(doctorScheduleRepository);

  return { sut, doctorScheduleRepository };
}

describe("CreateDoctorScheduleCommandHandler", () => {
  it("shoud be able to create doctor schedule", async () => {
    const { sut } = makeSut();
    const command = new CreateDoctorScheduleCommandBuilder().buildMany(5).build();

    const result = await sut.execute(command);

    expect(result.isRight()).toBeTruthy();
  });

  it("shoud throw DoctorScheduleAlreadyExistsError when some provided schedule is already created", async () => {
    const { sut, doctorScheduleRepository } = makeSut();
    const doctorSchedule = new DoctorScheduleBuilder().build();
    doctorScheduleRepository.items.push(doctorSchedule);
    const command = new CreateDoctorScheduleCommandBuilder()
      .with("doctorId", doctorSchedule.getDoctorId().toString())
      .with("schedules", [{ date: doctorSchedule.getDate(), time: doctorSchedule.getTime() }])
      .build();

    const result = await sut.execute(command);

    expect(result.isLeft()).toBeTruthy();
  });
})