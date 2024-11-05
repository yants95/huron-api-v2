import { Entity } from "#/core/domain/entities/entity";
import { Repository } from "#/core/domain/repository";

export class InMemoryRepository<E extends Entity<unknown>>
  implements Repository<E>
{
  items: E[] = [];

  async delete(id: string): Promise<void> {
    const i = this.items.findIndex((i) => i.id.toString() === id);

    this.items.splice(i, 1);
  }

  async find(): Promise<E[]> {
    return this.items;
  }

  async findOne(id: string): Promise<E | null> {
    return this.items.find((i) => i.id.toString() === id) || null;
  }

  async insert(e: E): Promise<void> {
    this.items.push(e);
  }

  async update(e: E): Promise<void> {
    const i = this.items.findIndex((i) => i.id === e.id);

    if (i !== -1) {
      this.items[i] = e;
    } else {
      this.items.push(e);
    }
  }
}
