import { CreateAdminBuilder } from "!tests/app/modules/user/builders/create-admin.builder";
import { CreateUserCommandBuilder } from "!tests/app/modules/user/builders/create-user-command.builder";
import { CreateUserBuilder } from "!tests/app/modules/user/builders/create-user.builder";
import { CreateUserMediatorStub } from "!tests/app/modules/user/doubles/create-user-mediator.stub";
import { InMemoryUserRepository } from "!tests/app/modules/user/doubles/in-memory-user-repository";
import { CreateUserCommandHandler } from "#/modules/user/application/cqrs/commands/create-user/create-user.command-handler";


interface Sut {
  sut: CreateUserCommandHandler;
  usersRepository: InMemoryUserRepository;
}

const makeSut = (): Sut => {
  const usersRepository = new InMemoryUserRepository();
  const mediator = new CreateUserMediatorStub();
  const sut = new CreateUserCommandHandler(usersRepository, mediator);

  return { sut, usersRepository };
}

describe("CreateUserCommandHandler", () => {
  it.each([new CreateAdminBuilder().build()])
    ("shoud be able to create user successfully with aggregates successfully", async (aggregate) => {
      const { sut, usersRepository } = makeSut();
      const command = new CreateUserCommandBuilder()
        .with("admin", aggregate)
        .build();

      const result = await sut.execute(command);

      const persistedUser = await usersRepository.findByEmail(command.props.email);
      expect(result.isRight()).toBeTruthy();
      expect(persistedUser).toBeDefined();
    });

  it("shoud throw UserAlreadyExistsError when creating user that already exists", async () => {
    const { sut, usersRepository } = makeSut();
    const user = new CreateUserBuilder().build();
    const command = new CreateUserCommandBuilder()
      .with("email", user.getPropsCopy().email)
      .build();
    usersRepository.items.push(user);

    const result = await sut.execute(command);

    expect(result.isLeft()).toBeTruthy();
  });
})