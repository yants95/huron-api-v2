import { Entity } from "#/core/domain/entities/entity";
import { Mapper } from "#/core/domain/entities/mapper";
import { Repository } from "#/core/domain/repository";
import { MongoSchema } from "#/core/infrastructure/db/mongodb/mongo-schema";
import { Connection, Model, ClientSession } from "mongoose";

export abstract class MongoRepository<
  DomainEntity extends Entity<unknown>,
  DbModel extends MongoSchema,
> implements Repository<DomainEntity>
{
  private transactionSession: ClientSession | null = null;

  protected constructor(
    protected readonly mapper: Mapper<DomainEntity, DbModel>,
    private readonly schema: Model<DbModel>,
    private readonly connection: Connection,
  ) {}

  public async insert(model: DomainEntity): Promise<void> {
    const record = this.mapper.toPersist(model);
    await this.schema.create(record);
  }

  public async update(entity: DomainEntity): Promise<void> {
    const model = this.mapper.toPersist(entity);
    await this.schema
      .updateOne(
        { id: model.id },
        { $set: { ...model, updatedAt: new Date() } },
      )
      .session(this.transactionSession);
  }

  public async findOne(id: string): Promise<DomainEntity | null> {
    const record = await this.schema.findOne({ id });
    if (!record) return null;
    return this.mapper.toDomain(record);
  }

  public async find(): Promise<DomainEntity[]> {
    const records = await this.schema.find();
    return records.map(this.mapper.toDomain);
  }

  async delete(id: string): Promise<void> {
    await this.schema.deleteOne({ id }).session(this.transactionSession);
  }

  public async transaction<T>(handler: () => Promise<T>): Promise<T> {
    const session = await this.lazyLoadTransactionSession();
    try {
      session.startTransaction();
      const result = await handler();
      await session.commitTransaction();
      return result;
    } catch (error: unknown) {
      await session.abortTransaction();
      throw error;
    } finally {
      await session.endSession();
      this.clearTransactionSession();
    }
  }

  public setTransactionSession(clientSession: ClientSession): void {
    this.transactionSession = clientSession;
  }

  public clearTransactionSession(): void {
    this.transactionSession = null;
  }

  public getTransactionSession(): ClientSession | null {
    return this.transactionSession;
  }

  private async lazyLoadTransactionSession(): Promise<ClientSession> {
    if (this.transactionSession) return this.transactionSession;
    this.transactionSession = await this.connection.startSession();
    return this.transactionSession;
  }
}
