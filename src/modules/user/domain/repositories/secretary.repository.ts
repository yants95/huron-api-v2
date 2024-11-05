import { Repository } from "#/core/domain/repository";
import { Secretary } from "#/modules/user/domain/entities/secretary";

export abstract class SecretaryRepository extends Repository<Secretary> {
  public abstract insert(entity: Secretary): Promise<void>;

  public abstract findByDocument(document: string): Promise<Secretary | null>;
}
