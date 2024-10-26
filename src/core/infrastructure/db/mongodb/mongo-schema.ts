import { Prop } from "@nestjs/mongoose";

export abstract class MongoSchema {
  @Prop({ required: true, unique: true })
  public readonly id!: string;

  @Prop({ required: true, type: Date })
  public readonly createdAt!: Date;

  @Prop({ required: false, type: Date, default: null })
  public readonly updatedAt?: Date;
}
