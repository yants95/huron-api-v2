import { Repository } from "#/core/domain/repository";
import { Admin } from "#/modules/user/domain/entities/admin";

export abstract class AdminRepository extends Repository<Admin> {
  public abstract insert(entity: Admin): Promise<void>;
}