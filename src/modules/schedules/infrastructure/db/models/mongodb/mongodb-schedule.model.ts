import { MongoSchema } from "#/core/infrastructure/db/mongodb/mongo-schema";
import { ScheduleModel } from "#/modules/schedules/infrastructure/db/models/schedule.model";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ collection: "schedules" })
export class MongoDBScheduleModel extends MongoSchema implements ScheduleModel {
  @Prop({ type: String, required: true, index: 1 })
  public doctorId!: string;

  @Prop({ type: String, required: true, index: 1 })
  public patientId!: string;

  @Prop({ type: String, required: true })
  public doctorScheduleId!: string;
}

export const MongoDBScheduleModelSchema = SchemaFactory.createForClass(MongoDBScheduleModel);
