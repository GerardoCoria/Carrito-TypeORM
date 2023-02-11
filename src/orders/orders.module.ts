import { forwardRef, Module } from '@nestjs/common';
import { OrdersController } from './controllers/orders.controller';

import { AuthModule } from '../auth/auth.module';
import { OrdersService } from './services/orders.service';

@Module({
  imports: [
    forwardRef(() => AuthModule),
   ],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService]
})
export class OrdersModule {}
