import { CreateUserCommandBuilder } from "!tests/app/modules/user/builders/create-user-command.builder";
import { CreateUserBuilder } from "!tests/app/modules/user/builders/create-user.builder";
import { InMemoryUserRepository } from "!tests/app/modules/user/doubles/in-memory-user-repository";
import { CreateUserCommandHandler } from "#/modules/user/application/cqrs/commands/create-user.command-handler"

interface Sut {
  sut: CreateUserCommandHandler;
  usersRepository: InMemoryUserRepository
}

const makeSut = (): Sut => {
  const usersRepository = new InMemoryUserRepository();
  const sut = new CreateUserCommandHandler(usersRepository);

  return { sut, usersRepository };
}

describe("CreateUserCommandHandler", () => {
  it("shoud be able to create user successfully", async () => {
    const { sut } = makeSut();
    const command = new CreateUserCommandBuilder().build();

    const result = await sut.execute(command);

    expect(result.isRight()).toBeTruthy();
  });

  it("shoud throw UserAlreadyExistsError when creating user that already exists", async () => {
    const { sut, usersRepository } = makeSut();
    const user = new CreateUserBuilder().build();
    const command = new CreateUserCommandBuilder()
      .withEmail(user.getPropsCopy().email)
      .build();
    usersRepository.items.push(user);

    const result = await sut.execute(command);

    expect(result.isLeft()).toBeTruthy();
  });
})