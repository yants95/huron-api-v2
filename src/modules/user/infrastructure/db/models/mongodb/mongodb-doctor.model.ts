import { MongoSchema } from "#/core/infrastructure/db/mongodb/mongo-schema";
import { DoctorModel } from "#/modules/user/infrastructure/db/models/doctor.model";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ collection: "doctors" })
export class MongoDBDoctorModel extends MongoSchema implements DoctorModel {
  @Prop({ type: String, default: null, required: false })
  public userId!: string;

  @Prop({ type: String, required: true })
  public document!: string;

  @Prop({ type: String, required: true })
  public crm!: string;

  @Prop({ type: String, required: true })
  public specialty!: string;
}

export const MongoDBDoctorModelSchema = SchemaFactory.createForClass(MongoDBDoctorModel);
