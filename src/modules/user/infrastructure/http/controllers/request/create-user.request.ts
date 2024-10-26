import { CreateUserCommand } from "#/modules/user/application/cqrs/commands/create-user.command";
import { Type } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { AdminSchema } from "#/modules/user/infrastructure/http/controllers/schemas/create-admin.schema";

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

  @IsOptional()
  @ValidateNested()
  @Type(() => AdminSchema)
  @ApiProperty({
    type: AdminSchema,
  })
  public admin?: AdminSchema;

  public toCommand(): CreateUserCommand {
    return new CreateUserCommand(
      this.name,
      this.email,
      this.password,
      undefined,
      undefined,
      this.admin
    );
  }
}
