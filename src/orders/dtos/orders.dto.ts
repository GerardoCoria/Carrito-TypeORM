import { ApiProperty, OmitType, PartialType } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsDate, IsArray, IsNumber, IsPositive } from 'class-validator'

export class CreateOrderDto{
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly customerId:number;

}

export class UpdateOrderDto extends PartialType(
  //OmitType(CreateOrderDto, ['products']),
  (CreateOrderDto)
){}

//export class AddProductsToOrderDto{
//  @IsNotEmpty()
//  @IsArray()
//  readonly products:string;
//}
