import { Controller, Get,Param, Body, Post, Put, Delete } from '@nestjs/common';
import { ApiTags } from "@nestjs/swagger";

import { CreateCheckoutDto, UpdateCheckoutDto } from '../dtos/checkout.dto';
import { CheckoutService } from "../services/checkout.service";

@ApiTags('Checkout')
@Controller('checkout')
export class CheckoutController {
  constructor(private checkoutService: CheckoutService) {}

  @Get()
  findAll() {
    return this.checkoutService.findAll();
  }

  @Get(':id')
  get(@Param('id') id: number) {
    return this.checkoutService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateCheckoutDto) {
    return this.checkoutService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: UpdateCheckoutDto) {
    return this.checkoutService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.checkoutService.remove(id);
  }
}
