import { CreatePatientBuilder } from "!tests/app/modules/patient/builders/create-patient.builder";
import { InMemoryPatientRepository } from "!tests/app/modules/patient/doubles/in-memory-patient-repository";
import { CreateScheduleCommandBuilder } from "!tests/app/modules/schedules/builders/create-schedule-command.builder";
import { DoctorScheduleBuilder, DoctorSchedulePropsBuilder } from "!tests/app/modules/schedules/builders/doctor-schedule.builder";
import { ScheduleBuilder } from "!tests/app/modules/schedules/builders/schedule.builder";
import { InMemoryDoctorScheduleRepository } from "!tests/app/modules/schedules/doubles/in-memory-doctor-schedule-repository";
import { InMemoryScheduleRepository } from "!tests/app/modules/schedules/doubles/in-memory-schedule-repository";
import { DoctorBuilder } from "!tests/app/modules/user/builders/create-doctor.builder";
import { InMemoryDoctorRepository } from "!tests/app/modules/user/doubles/in-memory-doctor-repository";
import { Ulid } from "#/core/domain/value-objects/ulid";
import { Patient } from "#/modules/patient/domain/entities/patient";
import { PatientId } from "#/modules/patient/domain/value-objects/patient-id";
import { CreateScheduleCommandHandler } from "#/modules/schedules/application/cqrs/commands/schedule/create-schedule.command-handler";
import { DoctorSchedule } from "#/modules/schedules/domain/entities/doctor-schedule";
import { Schedule } from "#/modules/schedules/domain/entities/schedule";
import { DoctorScheduleId } from "#/modules/schedules/domain/value-objects/doctor-schedule-id";
import { Doctor } from "#/modules/user/domain/entities/doctor";
import { DoctorId } from "#/modules/user/domain/value-objects/doctor-id";

interface Sut {
  sut: CreateScheduleCommandHandler;
  patientRepository: InMemoryPatientRepository;
  doctorScheduleRepository: InMemoryDoctorScheduleRepository;
  scheduleRepository: InMemoryScheduleRepository;
  doctorRepository: InMemoryDoctorRepository;
}

interface Fixture {
  patient: Patient;
  doctor: Doctor;
  doctorSchedule: DoctorSchedule;
  schedule: Schedule;
}

const makeSut = (): Sut => {
  const doctorScheduleRepository = new InMemoryDoctorScheduleRepository();
  const patientRepository = new InMemoryPatientRepository();
  const scheduleRepository = new InMemoryScheduleRepository();
  const doctorRepository = new InMemoryDoctorRepository();
  const sut = new CreateScheduleCommandHandler(
    patientRepository,
    doctorRepository,
    doctorScheduleRepository,
    scheduleRepository
  );

  return { sut, doctorScheduleRepository, patientRepository, scheduleRepository, doctorRepository };
}

const makeFixture = (): Fixture => {
  const patient = new CreatePatientBuilder().build();
  const doctor = new DoctorBuilder().build();
  const doctorSchedule = new DoctorScheduleBuilder().build();
  const schedule = new ScheduleBuilder().build();

  return { patient, doctor, doctorSchedule, schedule };
}

describe("CreateScheduleCommandHandler", () => {
  it("should be able to create a new schedule", async () => {
    const { sut, patientRepository, doctorRepository, doctorScheduleRepository } = makeSut();
    const { patient, doctor, doctorSchedule } = makeFixture();
    const command = new CreateScheduleCommandBuilder()
      .with("patientId", patient.id.toString())
      .with("doctorId", doctor.id.toString())
      .with("doctorScheduleId", doctorSchedule.id.toString())
      .build();
    patientRepository.items.push(patient);
    doctorRepository.items.push(doctor);
    doctorScheduleRepository.items.push(doctorSchedule);

    const result = await sut.execute(command);

    expect(result.isRight()).toBeTruthy();
  });

  it("should throw PatientNotFoundError when patient was not found", async () => {
    const { sut } = makeSut();
    const { patient, doctor, doctorSchedule } = makeFixture();
    const command = new CreateScheduleCommandBuilder()
      .with("patientId", patient.id.toString())
      .with("doctorId", doctor.id.toString())
      .with("doctorScheduleId", doctorSchedule.id.toString())
      .build();

    const result = await sut.execute(command);

    expect(result.isLeft()).toBeTruthy();
  });

  it("should throw DoctorNotFoundError when doctor was not found", async () => {
    const { sut, patientRepository } = makeSut();
    const { patient, doctor, doctorSchedule } = makeFixture();
    const command = new CreateScheduleCommandBuilder()
      .with("patientId", patient.id.toString())
      .with("doctorId", doctor.id.toString())
      .with("doctorScheduleId", doctorSchedule.id.toString())
      .build();
    patientRepository.items.push(patient);

    const result = await sut.execute(command);

    expect(result.isLeft()).toBeTruthy();
  });

  it("should throw DoctorScheduleNotFoundError when doctor schedule was not found", async () => {
    const { sut, patientRepository, doctorRepository } = makeSut();
    const { patient, doctor, doctorSchedule } = makeFixture();
    const command = new CreateScheduleCommandBuilder()
      .with("patientId", patient.id.toString())
      .with("doctorId", doctor.id.toString())
      .with("doctorScheduleId", doctorSchedule.id.toString())
      .build();
    patientRepository.items.push(patient);
    doctorRepository.items.push(doctor);

    const result = await sut.execute(command);

    expect(result.isLeft()).toBeTruthy();
  });

  it("should throw PatientAlreadyBooked when patient already booked an schedule", async () => {
    const { sut, patientRepository, doctorRepository, doctorScheduleRepository, scheduleRepository } = makeSut();
    const { patient, doctor, doctorSchedule } = makeFixture();
    const command = new CreateScheduleCommandBuilder()
      .with("patientId", patient.id.toString())
      .with("doctorId", doctor.id.toString())
      .with("doctorScheduleId", doctorSchedule.id.toString())
      .build();
    const schedule = new ScheduleBuilder()
      .with("patientId", PatientId.create(patient.id.toString()))
      .with("doctorId", DoctorId.create(doctor.id.toString()))
      .build();
    patientRepository.items.push(patient);
    doctorRepository.items.push(doctor);
    doctorScheduleRepository.items.push(doctorSchedule);
    scheduleRepository.items.push(schedule);

    const result = await sut.execute(command);

    expect(result.isLeft()).toBeTruthy();
  });

  it("should throw DoctorScheduleUnavailableError when chosen schedule is unavailable", async () => {
    const { sut, patientRepository, doctorRepository, doctorScheduleRepository, scheduleRepository } = makeSut();
    const { patient, doctor, schedule } = makeFixture();
    const doctorScheduleProps = new DoctorSchedulePropsBuilder().with("bookedAt", new Date()).build();
    const doctorSchedule = DoctorSchedule.restore({
      id: DoctorScheduleId.create(Ulid.new()),
      props: doctorScheduleProps,
    })
    const command = new CreateScheduleCommandBuilder()
      .with("patientId", patient.id.toString())
      .with("doctorId", doctor.id.toString())
      .with("doctorScheduleId", doctorSchedule.id.toString())
      .build();
    patientRepository.items.push(patient);
    doctorRepository.items.push(doctor);
    doctorScheduleRepository.items.push(doctorSchedule);
    scheduleRepository.items.push(schedule);

    const result = await sut.execute(command);

    expect(result.isLeft()).toBeTruthy();
  });
})