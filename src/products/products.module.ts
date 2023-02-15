import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";

import { ProductsService } from './services/products.service'
import { Product } from '../products/entities/product.entity'
import { ProductsController } from "./controllers/products.controller";
import { CategoriesService } from './services/categories.service';
import { CategoriesController } from './controllers/categories.controller';
import { BrandsService } from './services/brands.service';
import { BrandsController } from './controllers/brands.controller';

@Module({
  imports:[TypeOrmModule.forFeature([Product])],
  controllers:[ProductsController, BrandsController, CategoriesController],
  providers:[ProductsService, BrandsService, CategoriesService],
  exports: [ProductsService]
})
export class ProductsModule {}
