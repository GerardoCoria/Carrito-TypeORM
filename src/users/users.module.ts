import { Module } from '@nestjs/common';

import { UsersController } from "./controllers/users.controller";
import { UsersService } from "./services/users.service";
import { ProfileController } from './controllers/profile.controller';
import { OrdersModule } from "../orders/orders.module";

@Module({
  imports: [OrdersModule],
  controllers: [UsersController, ProfileController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
