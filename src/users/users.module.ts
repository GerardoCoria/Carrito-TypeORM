import { Module } from '@nestjs/common';
import { CustomersController } from './controllers/customers.controller';

import { UsersController } from "./controllers/users.controller";
import { CustomersService } from './services/customers.service';
import { UsersService } from "./services/users.service";
import { ProfileController } from './controllers/profile.controller';
import { OrdersModule } from "../orders/orders.module";

@Module({
  imports: [OrdersModule],
  controllers: [UsersController, CustomersController, ProfileController],
  providers: [UsersService, CustomersService],
  exports: [UsersService, CustomersService]
})
export class UsersModule {}
