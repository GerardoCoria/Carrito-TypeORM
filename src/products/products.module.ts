import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";

import { ProductsController } from "./controllers/products.controller";
import { ProductsService } from './services/products.service'
import { Product } from '../products/entities/product.entity'
import { CategoriesController } from './controllers/categories.controller';
import { CategoriesService } from './services/categories.service';
import { Category } from './entities/category.entity';
import { BrandsController } from './controllers/brands.controller';
import { BrandsService } from './services/brands.service';
import { Brand } from './entities/brand.entity';
import { OrdersModule } from '../orders/orders.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Product, Brand, Category]),
  ],
  controllers:[ProductsController, BrandsController, CategoriesController],
  providers:[ProductsService, BrandsService, CategoriesService],
  exports: [ProductsService, TypeOrmModule]
})
export class ProductsModule {}
