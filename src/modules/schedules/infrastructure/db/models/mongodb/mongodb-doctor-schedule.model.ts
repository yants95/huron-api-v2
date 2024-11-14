import { MongoSchema } from "#/core/infrastructure/db/mongodb/mongo-schema";
import { DoctorScheduleStatus } from "#/modules/schedules/domain/enum/doctor-schedule-status.enum";
import { DoctorScheduleModel } from "#/modules/schedules/infrastructure/db/models/doctor-schedule.model";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ collection: "doctor_schedules" })
export class MongoDBDoctorScheduleModel extends MongoSchema implements DoctorScheduleModel {
  @Prop({ type: String, required: true, index: 1 })
  public doctorId!: string;

  @Prop({ type: String, required: true, index: 1 })
  public date!: string;

  @Prop({ type: String, required: true, index: 1 })
  public time!: string;

  @Prop({ type: String, required: true })
  public status!: DoctorScheduleStatus;

  @Prop({ type: Date })
  public bookedAt?: Date;
}

export const MongoDBDoctorScheduleModelSchema = SchemaFactory.createForClass(MongoDBDoctorScheduleModel);
