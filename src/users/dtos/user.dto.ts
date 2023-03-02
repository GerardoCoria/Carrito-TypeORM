import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto{
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly name:string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly lastname:string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  readonly email:string;

  @IsNotEmpty()
  @ApiProperty()
  readonly password:string;

  @IsNotEmpty()
  @ApiProperty()
  readonly phone:string;

  @IsNotEmpty()
  @ApiProperty()
  readonly role:string;
}

export class UpdateUserDto extends PartialType(CreateUserDto){};

