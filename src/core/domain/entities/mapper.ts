import { Entity } from "#/core/domain/entities/entity";

export interface Mapper<DomainEntity extends Entity<unknown>, DbModel> {
  toPersist(entity: DomainEntity): DbModel;
  toDomain(record: DbModel): DomainEntity;
}
