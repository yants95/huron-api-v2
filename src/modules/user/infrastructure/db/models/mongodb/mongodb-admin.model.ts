import { MongoSchema } from "#/core/infrastructure/db/mongodb/mongo-schema";
import { AdminModel } from "#/modules/user/infrastructure/db/models/admin.model";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ collection: "admins" })
export class MongoDBAdminModel extends MongoSchema implements AdminModel {
  @Prop({ type: String, default: null, required: false })
  public userId!: string;

  @Prop({ type: String, required: true })
  public document!: string;
}

export const MongoDBAdminModelSchema = SchemaFactory.createForClass(MongoDBAdminModel);
