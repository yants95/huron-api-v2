import { InMemoryRepository } from "!tests/core/domain/repositories/in-memory-repository";
import { Secretary } from "#/modules/user/domain/entities/secretary";
import { SecretaryRepository } from "#/modules/user/domain/repositories/secretary.repository";

export class InMemorySecretaryRepository extends InMemoryRepository<Secretary> implements SecretaryRepository {
  public async findByDocument(document: string): Promise<Secretary | null> {
    const secretary = this.items.find((secretary) => secretary.getPropsCopy().document === document);
    return secretary ?? null;
  }
}
