import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersService } from "./services/users.service";
import { UsersController } from "./controllers/users.controller";
import { User } from './entities/user.entity';
import { ProfileController } from './controllers/profile.controller';
import { OrdersModule } from "../orders/orders.module";

@Module({
  imports: [OrdersModule,  TypeOrmModule.forFeature([User])],
  controllers: [UsersController, ProfileController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
