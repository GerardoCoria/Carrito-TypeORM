import { Module } from '@nestjs/common';

import { CheckoutController } from "./controllers/checkout.controller";
import { Checkout } from './entities/checkout.entity';
import { CheckoutService } from "./services/checkout.service";

@Module({
  imports:[],
  controllers:[CheckoutController],
  providers: [CheckoutService],
  exports:[CheckoutService]
})
export class CheckoutModule {}

