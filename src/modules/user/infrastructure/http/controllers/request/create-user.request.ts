import { Type } from "class-transformer";
import { IsEnum, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { AdminSchema } from "#/modules/user/infrastructure/http/controllers/schemas/create-admin.schema";
import { CreateUserCommand } from "#/modules/user/application/cqrs/commands/create-user/create-user.command";
import { DoctorSchema } from "#/modules/user/infrastructure/http/controllers/schemas/create-doctor.schema";
import { SecretarySchema } from "#/modules/user/infrastructure/http/controllers/schemas/create-secretary.schema";
import { UserType } from "#/modules/user/domain/enum/user-type";

export class CreateUserRequest {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  public name!: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  public email!: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  public password!: string;

  @IsNotEmpty()
  @IsEnum(UserType)
  public type!: UserType;

  @IsOptional()
  @ValidateNested()
  @Type(() => AdminSchema)
  @ApiProperty({
    type: AdminSchema,
  })
  public admin?: AdminSchema;

  @IsOptional()
  @ValidateNested()
  @Type(() => DoctorSchema)
  @ApiProperty({
    type: DoctorSchema,
  })
  public doctor?: DoctorSchema;

  @IsOptional()
  @ValidateNested()
  @Type(() => SecretarySchema)
  @ApiProperty({
    type: SecretarySchema,
  })
  public secretary?: SecretarySchema;

  public toCommand(): CreateUserCommand {
    return new CreateUserCommand({
      name: this.name,
      email: this.email,
      password: this.password,
      admin: this.admin,
      doctor: this.doctor,
      secretary: this.secretary
    });
  }
}
