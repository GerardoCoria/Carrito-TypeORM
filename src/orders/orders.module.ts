import { forwardRef, Module } from '@nestjs/common';
import { OrdersController } from './controllers/orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';
import { OrdersService } from './services/orders.service';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { UsersModule } from '../users/users.module';
import { OrdenItemController } from './controllers/orden-item.controller';
import { OrdenItemService } from './services/orden-item.service';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderItem]),
    forwardRef(() => AuthModule),
    forwardRef(() => UsersModule),
    forwardRef(() => ProductsModule),
  ],
  controllers: [OrdersController, OrdenItemController],
  providers: [OrdersService, OrdenItemService],
  exports: [OrdersService, TypeOrmModule]
})
export class OrdersModule {}
