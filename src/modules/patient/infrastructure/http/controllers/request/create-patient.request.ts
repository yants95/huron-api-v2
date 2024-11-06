import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { CreatePatientCommand } from "#/modules/patient/application/cqrs/commands/create-patient/create-patient.command";

export class CreatePatientRequest {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  public name!: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  public email!: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  public age!: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  public height!: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  public weight!: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  public document!: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  public gender?: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  public phone!: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  public cep!: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  public address!: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  public birthDate!: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  public responsibleName!: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  public responsibleDocument!: string;

  public toCommand(): CreatePatientCommand {
    return new CreatePatientCommand(this);
  }
}
