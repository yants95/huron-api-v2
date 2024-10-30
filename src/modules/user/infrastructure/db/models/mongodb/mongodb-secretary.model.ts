import { MongoSchema } from "#/core/infrastructure/db/mongodb/mongo-schema";
import { SecretaryModel } from "#/modules/user/infrastructure/db/models/secretary.model";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ collection: "secretaries" })
export class MongoDBSecretaryModel extends MongoSchema implements SecretaryModel {
  @Prop({ type: String, default: null, required: false })
  public userId!: string;

  @Prop({ type: String, required: true })
  public document!: string;
}

export const MongoDBSecretaryModelSchema = SchemaFactory.createForClass(MongoDBSecretaryModel);
