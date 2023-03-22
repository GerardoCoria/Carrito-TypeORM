import { Controller, Get, Param, Post, Body, Put, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation } from "@nestjs/swagger";

import { ProductsService } from "../services/products.service";
import { CreateProductDto, UpdateProductDto, FilterProductsDto } from '../dtos/products.dto'
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";
import { Public } from "../../auth/decorators/public.decorator";
import { Roles } from "../../auth/decorators/roles.decorator";
import { Role } from "../../auth/models/roles.model";
import { RolesGuard } from "../../auth/guards/roles.guard";
import { ParseIntPipe } from "../../common/parse-int.pipe";

@ApiTags('Productos')
//@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('products')
export class ProductsController {

  constructor(private services: ProductsService){}

  @Get()
  @Public()
  @ApiOperation({summary:'Retorna todos los productos.'})
  getAll(@Query() params:FilterProductsDto){
    return this.services.findAll(params)
  }

  @Get(':id')
  @Public()
  @ApiOperation({summary:'Devuelve un producto por su N° de ID'})
  getById(@Param('id', ParseIntPipe ) id: number){
    return this.services.findOne(id)
  }

  @Post()
  //@Roles(Role.ADMIN)
  @ApiOperation({summary:'Agrega un producto nuevo'})
  create(@Body() payload:CreateProductDto){
    return this.services.create(payload)
  }

  @Put(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({summary:'Modifica un producto en uno o más atributos.'})
  update(@Param('id', ParseIntPipe) id:number, @Body() payload:UpdateProductDto){
    return this.services.update(id, payload)
  }

  @Put(':id/category/:categoryId')
  //Roles
  @ApiOperation({summary:'Agrega una categoría relacionada a un producto determinado'})
  addCategory(
    @Param('id', ParseIntPipe) idProduct:number,
    @Param('categoryId', ParseIntPipe) idCategory:number
  ){
    return this.services.addCategory(idProduct, idCategory)
  }

  @Delete(':id/category/:categoryId')
  //Roles
  @ApiOperation({summary:'Elimina una categoría relacionada a un producto determinado'})
  deleteCategory(
    @Param('id', ParseIntPipe) idProduct:number,
    @Param('categoryId', ParseIntPipe) idCategory:number
  ){
    return this.services.removeCategory(idProduct, idCategory)
  }


  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({summary:'Elimina el producto seleccionado por su N° de ID'})
  borrar(@Param('id', ParseIntPipe) id:number){
    return this.services.remove(id)
  }
}
