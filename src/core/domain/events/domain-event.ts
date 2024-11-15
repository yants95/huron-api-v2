import { ulid } from "ulidx";

export abstract class DomainEvent {
  private id: string;
  private timestamp: number;
  private correlationId: string;

  public constructor() {
    this.id = ulid();
    this.timestamp = Date.now();
    this.correlationId = '';
  }

  abstract getName(): string;

  getTimestamp(): number {
    return this.timestamp;
  }

  getId(): string {
    return this.id;
  }

  getCorrelationId(): string {
    return this.correlationId;
  }
}
