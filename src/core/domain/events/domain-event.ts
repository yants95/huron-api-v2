import { ulid } from "ulidx";

export abstract class DomainEvent {
  private id: string;
  private timestamp: number;

  public constructor() {
    this.id = ulid();
    this.timestamp = Date.now();
  }

  abstract getName(): string;

  getTimestamp(): number {
    return this.timestamp;
  }

  getId(): string {
    return this.id;
  }
}
