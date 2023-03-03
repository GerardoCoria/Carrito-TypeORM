import { OmitType, PartialType } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsDate, IsArray, IsNumber } from 'class-validator'

export class CreateOrderDto{
  @IsNotEmpty()
  @IsArray()
  readonly products:string[];
}

export class UpdateOrderDto extends PartialType(
  OmitType(CreateOrderDto, ['products']),
){}

export class AddProductsToOrderDto{
  @IsNotEmpty()
  @IsArray()
  readonly products:string;
}
