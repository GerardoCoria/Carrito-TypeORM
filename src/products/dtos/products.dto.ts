import { IsString, IsNumber, IsNotEmpty, IsPositive, IsOptional, Min, ValidateIf, ValidateNested, IsDate } from 'class-validator'
import { PartialType, ApiProperty} from "@nestjs/swagger";

import { CreateCategoryDto } from "../dtos/categories.dto";


export class CreateProductDto{
  @IsString({message: 'Debe ingresar texto'})
  @IsNotEmpty({message: "No debe estar vacío"})
  @ApiProperty()
  readonly name:string;

  @IsString({message: 'Debe ingresar texto'})
  @IsNotEmpty({message: "No debe estar vacío"})
  @ApiProperty()
  readonly description:string;

  @IsNumber({allowNaN:false}, {message: "Debe ser un número"})
  @IsNotEmpty({message: "No debe estar vacío"})
  @IsPositive({message: "El número debe ser mayor a cero."})
  @ApiProperty({description: 'El precio está expresado en pesos y en dólares (valor libre).'})
  readonly price:number;

  @IsNumber({allowNaN:false}, {message: "Debe ser un número"})
  @IsNotEmpty({message: "No debe estar vacío"})
  @IsPositive({message: "El número debe ser mayor a cero."})
  @ApiProperty()
  readonly stock:number;

  //@IsNotEmpty()
  //@ApiProperty({description: "Indica la categoría del producto"})
  //readonly category:CreateCategoryDto;

  @IsNotEmpty()
  @ApiProperty()
  readonly brand:string;

  @IsNotEmpty()
  @IsDate()
  @ApiProperty()
  readonly expires:Date;

  @IsNotEmpty()
  @ApiProperty()
  readonly batch:string;

  @IsNotEmpty()
  @ApiProperty()
  readonly image:string;
}

export class UpdateProductDto extends PartialType(CreateProductDto){}


export class FilterProductsDto{
  @IsOptional()
  @IsPositive()
  limit:number;

  @IsOptional()
  @Min(0)
  offset:number;

  @IsOptional()
  @Min(0)
  minPrice:number;

  @ValidateIf((params) => params.minPrice)
  @IsPositive()
  maxPrice:number;

  @IsOptional()
  search:string;
}
