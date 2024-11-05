import { InMemoryRepository } from "!tests/core/domain/repositories/in-memory-repository";
import { User } from "#/modules/user/domain/entities/user";
import { UserRepository } from "#/modules/user/domain/repositories/user.repository";

export class InMemoryUserRepository extends InMemoryRepository<User> implements UserRepository
{
  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find((user) => user.getPropsCopy().email === email);
    return user ?? null;
  }
}
