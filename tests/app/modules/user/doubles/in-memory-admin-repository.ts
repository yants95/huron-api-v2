import { InMemoryRepository } from "!tests/core/domain/repositories/in-memory-repository";
import { Admin } from "#/modules/user/domain/entities/admin";
import { AdminRepository } from "#/modules/user/domain/repositories/admin.repository";

export class InMemoryAdminRepository extends InMemoryRepository<Admin> implements AdminRepository {
  public async findByDocument(document: string): Promise<Admin | null> {
    const admin = this.items.find((item) => item.getPropsCopy().document === document);
    return admin ?? null;
  }
}
