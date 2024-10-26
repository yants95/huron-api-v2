import { MongoSchema } from "#/core/infrastructure/db/mongodb/mongo-schema";
import { UserStatus } from "#/modules/user/domain/enum/user-status";
import { UserType } from "#/modules/user/domain/enum/user-type";
import { UserModel } from "#/modules/user/infrastructure/db/models/user.model";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ collection: "users" })
export class MongoDBUserModel extends MongoSchema implements UserModel {
  @Prop({ type: String, default: null, required: false })
  public name!: string;

  @Prop({ type: String, required: true })
  public password!: string;

  @Prop({ unique: true, type: String, required: true })
  public email!: string;

  @Prop({ type: String, required: true })
  public type!: UserType;

  @Prop({ type: String, default: null })
  public status!: UserStatus;

  @Prop({ required: false, type: Date, default: null })
  public readonly firstAccessAt!: Date;

  @Prop({ required: false, type: Date, default: null })
  public readonly updatedAt!: Date;
}

export const MongoDBUserModelSchema = SchemaFactory.createForClass(MongoDBUserModel);
