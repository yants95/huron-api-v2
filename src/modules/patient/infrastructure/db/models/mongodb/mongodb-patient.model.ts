import { MongoSchema } from "#/core/infrastructure/db/mongodb/mongo-schema";
import { PatientModel } from "#/modules/patient/infrastructure/db/models/patient.model";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ collection: "patients" })
export class MongoDBPatientModel extends MongoSchema implements PatientModel {
  @Prop({ type: String })
  public name!: string;

  @Prop({ type: String })
  public email!: string;

  @Prop({ type: Number })
  public age!: number;

  @Prop({ type: String })
  public height!: string;

  @Prop({ type: String })
  public weight!: string;

  @Prop({ type: String })
  public document!: string;

  @Prop({ type: String })
  public gender?: string;

  @Prop({ type: String })
  public phone!: string;

  @Prop({ type: String })
  public cep!: string;

  @Prop({ type: String })
  public address!: string;

  @Prop({ type: String })
  public birthDate!: string;

  @Prop({ type: String })
  public responsibleName?: string;

  @Prop({ type: String })
  public responsibleDocument?: string;
  
}

export const MongoDBPatientModelSchema = SchemaFactory.createForClass(MongoDBPatientModel);
