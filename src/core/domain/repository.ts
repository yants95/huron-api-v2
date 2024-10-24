export abstract class Repository<T> {
  abstract insert(payload: T): Promise<void>;
  abstract update(payload: T): Promise<void>;
  abstract delete(id: string): Promise<void>;
  abstract findOne(id: string): Promise<T | null>;
  abstract find(): Promise<T[]>;
}
