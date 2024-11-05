import { ulid } from "ulidx";

export abstract class DomainEvent<T = unknown> {
  private id: string;
  private timestamp: number;
  private data: T;

  public constructor() {
    this.id = ulid();
    this.timestamp = Date.now();
  }

  abstract getName(): string;

  public getData(): T {
    return this.data;
  }

  getTimestamp(): number {
    return this.timestamp;
  }

  getId(): string {
    return this.id;
  }
}
