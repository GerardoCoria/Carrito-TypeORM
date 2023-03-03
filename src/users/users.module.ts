import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersController } from "./controllers/users.controller";
import { UsersService } from "./services/users.service";
import { User } from './entities/user.entity';
import { ProfileController } from './controllers/profile.controller';
import { OrdersModule } from "../orders/orders.module";
import { CustomersController } from './controllers/customer.controller';
import { CustomerService } from './services/customer.service';
import { Customer } from './entities/customer.entity';

@Module({
  imports: [OrdersModule, TypeOrmModule.forFeature([User, Customer])],
  controllers: [UsersController, ProfileController, CustomersController],
  providers: [UsersService, CustomerService],
  exports: [UsersService, CustomerService]
})
export class UsersModule {}
