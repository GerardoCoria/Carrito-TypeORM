import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateCustomerDto{
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly name:string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly lastname:string;

  @IsNotEmpty()
  @ApiProperty()
  readonly phone:string;
}

export class UpdateCustomerDto extends PartialType(CreateCustomerDto){};
