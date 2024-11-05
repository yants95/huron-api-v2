import { Repository } from "#/core/domain/repository";
import { User } from "#/modules/user/domain/entities/user";

export abstract class UserRepository extends Repository<User> {
  public abstract insert(entity: User): Promise<void>;

  public abstract findByEmail(email: string): Promise<User | null>;
}